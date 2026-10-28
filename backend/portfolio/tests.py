from django.core import mail
from rest_framework.test import APITestCase

from .models import ContactMessage, Profile, Project


class ApiTests(APITestCase):
    def setUp(self):
        Profile.objects.create(name="Yomi Fabiyi", role="Engineer", headline="h", intro="i", email="y@x.com")
        Project.objects.create(slug="a", title="A", category="c", year=2024, summary="s", featured=True)
        Project.objects.create(slug="b", title="B", category="c", year=2023, summary="s")

    def test_profile(self):
        r = self.client.get("/api/profile/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.data["name"], "Yomi Fabiyi")
        self.assertIsNone(r.data["resume_url"])

    def test_projects_list_detail_and_featured(self):
        self.assertEqual(len(self.client.get("/api/projects/").data), 2)
        self.assertEqual(len(self.client.get("/api/projects/?featured=true").data), 1)
        self.assertEqual(self.client.get("/api/projects/a/").data["title"], "A")
        self.assertEqual(self.client.get("/api/projects/zzz/").status_code, 404)

    def test_contact_saves_and_emails(self):
        r = self.client.post("/api/contact/", {"name": "N", "email": "n@x.com", "message": "Hi"}, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    def test_contact_validation_and_honeypot(self):
        self.assertEqual(self.client.post("/api/contact/", {"name": "N"}, format="json").status_code, 400)
        r = self.client.post("/api/contact/", {"name": "B", "email": "b@x.com", "message": "m", "website": "spam"}, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_resume_download_404_without_file(self):
        self.assertEqual(self.client.get("/api/resume/download/").status_code, 404)
