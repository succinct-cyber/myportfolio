from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("projects", views.ProjectViewSet, basename="project")

urlpatterns = [
    path("profile/", views.ProfileView.as_view()),
    path("skills/", views.SkillListView.as_view()),
    path("resume/", views.ResumeView.as_view()),
    path("resume/download/", views.ResumeDownloadView.as_view()),
    path("contact/", views.ContactCreateView.as_view()),
    path("", include(router.urls)),
]
