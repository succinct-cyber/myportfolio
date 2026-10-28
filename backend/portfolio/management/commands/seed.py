import json
from pathlib import Path

from django.core.management.base import BaseCommand

from portfolio.models import Education, Experience, Profile, Project, Skill, SkillCategory

FIXTURE = Path(__file__).resolve().parents[2] / "fixtures" / "content.json"


class Command(BaseCommand):
    help = "Load portfolio content from fixtures/content.json (idempotent)."

    def handle(self, *args, **opts):
        data = json.loads(FIXTURE.read_text(encoding="utf-8"))

        p = {k: v for k, v in data["profile"].items() if k != "resume_url"}
        Profile.objects.update_or_create(pk=1, defaults=p)

        for i, proj in enumerate(data["projects"]):
            proj = {k: v for k, v in proj.items() if k != "cover"}
            slug = proj.pop("slug")
            proj.setdefault("order", i)
            Project.objects.update_or_create(slug=slug, defaults=proj)

        for i, cat in enumerate(data["skills"]):
            obj, _ = SkillCategory.objects.update_or_create(
                name=cat["name"], defaults={"icon": cat["icon"], "blurb": cat["blurb"], "order": i})
            obj.items.all().delete()
            Skill.objects.bulk_create(
                Skill(category=obj, name=s["name"], level=s["level"], order=j)
                for j, s in enumerate(cat["items"]))

        Experience.objects.all().delete()
        for i, e in enumerate(data["experience"]):
            Experience.objects.create(order=i, **e)
        Education.objects.all().delete()
        for i, e in enumerate(data["education"]):
            Education.objects.create(order=i, **e)

        self.stdout.write(self.style.SUCCESS("Portfolio content seeded."))
