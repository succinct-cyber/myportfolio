from rest_framework import serializers

from .models import ContactMessage, Education, Experience, Profile, Project, Skill, SkillCategory


def absolute(request, f):
    if not f:
        return None
    return request.build_absolute_uri(f.url) if request else f.url


class ProfileSerializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        exclude = ["id", "resume_file"]

    def get_resume_url(self, obj):
        return absolute(self.context.get("request"), obj.resume_file)


class ProjectSerializer(serializers.ModelSerializer):
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ["id", "cover_image"]

    def get_cover(self, obj):
        return absolute(self.context.get("request"), obj.cover_image) or obj.cover_path or None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "level"]


class SkillCategorySerializer(serializers.ModelSerializer):
    items = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ["name", "icon", "blurb", "items"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        exclude = ["id", "order"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ["id", "order"]


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "topic", "message"]
