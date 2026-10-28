from django.db import models


class Profile(models.Model):
    """Singleton: the one person this site is about."""

    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    availability = models.CharField(max_length=160, blank=True)
    headline = models.CharField(max_length=200)
    intro = models.TextField()
    email = models.EmailField()
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    location = models.CharField(max_length=160, blank=True)
    timezone = models.CharField(max_length=40, blank=True)
    response_time = models.CharField(max_length=160, blank=True)
    specialization = models.CharField(max_length=200, blank=True)
    core_stack = models.CharField(max_length=200, blank=True)
    approach = models.CharField(max_length=200, blank=True)
    philosophy = models.CharField(max_length=200, blank=True)
    bio = models.JSONField(default=list, help_text="List of paragraphs.")
    quote = models.TextField(blank=True)
    resume_file = models.FileField(upload_to="resume/", blank=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=80)
    year = models.PositiveSmallIntegerField()
    summary = models.TextField()
    description = models.JSONField(default=list, help_text="List of paragraphs.")
    highlights = models.JSONField(default=list)
    stack = models.JSONField(default=list)
    links = models.JSONField(default=list, help_text='[{"label","url" or "to","icon"}]')
    metrics = models.JSONField(default=list, blank=True, help_text='[{"value","decimals","prefix","suffix","label"}]')
    snippet = models.TextField(blank=True)
    snippet_title = models.CharField(max_length=120, blank=True)
    snippet_meta = models.CharField(max_length=80, blank=True)
    cover_image = models.ImageField(upload_to="projects/", blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    cover_path = models.CharField(max_length=200, blank=True, help_text="e.g. /projects/ojaevents.png (file in frontend/public)")

    class Meta:
        ordering = ["order", "-year"]

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=30, default="server")
    blurb = models.CharField(max_length=200, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "skill categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    level = models.CharField(max_length=40, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Experience(models.Model):
    role = models.CharField(max_length=120)
    company = models.CharField(max_length=120)
    period = models.CharField(max_length=60)
    summary = models.TextField(blank=True)
    bullets = models.JSONField(default=list, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(models.Model):
    title = models.CharField(max_length=160)
    institution = models.CharField(max_length=160)
    period = models.CharField(max_length=60, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    topic = models.CharField(max_length=160, blank=True)
    message = models.TextField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"
