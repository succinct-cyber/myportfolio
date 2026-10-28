from django.conf import settings
from django.core.mail import send_mail
from django.http import FileResponse, Http404
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Education, Experience, Profile, Project, SkillCategory
from .serializers import (
    ContactSerializer, EducationSerializer, ExperienceSerializer, ProfileSerializer,
    ProjectSerializer, SkillCategorySerializer,
)


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            raise Http404
        return Response(ProfileSerializer(profile, context={"request": request}).data)


class ProjectViewSet(ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = Project.objects.all()
        if self.request.query_params.get("featured") == "true":
            qs = qs.filter(featured=True)
        return qs


class SkillListView(ListAPIView):
    queryset = SkillCategory.objects.prefetch_related("items")
    serializer_class = SkillCategorySerializer


class ResumeView(APIView):
    def get(self, request):
        return Response({
            "experience": ExperienceSerializer(Experience.objects.all(), many=True).data,
            "education": EducationSerializer(Education.objects.all(), many=True).data,
        })


class ResumeDownloadView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile or not profile.resume_file:
            raise Http404("No resume uploaded.")
        return FileResponse(profile.resume_file.open("rb"), as_attachment=True, filename="Yomi-Fabiyi-Resume.pdf")


class ContactCreateView(CreateAPIView):
    serializer_class = ContactSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def create(self, request, *args, **kwargs):
        # Honeypot: real visitors never see this field; bots fill it in.
        if request.data.get("website"):
            return Response({"detail": "Message received."}, status=status.HTTP_201_CREATED)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save()
        send_mail(
            subject=f"[Portfolio] {msg.topic or 'New message'} — {msg.name}",
            message=f"From: {msg.name} <{msg.email}>\nTopic: {msg.topic}\n\n{msg.message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_RECIPIENT],
            fail_silently=True,
        )
        return Response({"detail": "Message received."}, status=status.HTTP_201_CREATED)
