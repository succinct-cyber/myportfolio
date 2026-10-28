from django.contrib import admin

from .models import ContactMessage, Education, Experience, Profile, Project, Skill, SkillCategory


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    inlines = [SkillInline]
    list_display = ["name", "order"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "year", "featured", "order"]
    list_editable = ["featured", "order"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "topic", "created_at", "handled"]
    list_filter = ["handled"]
    readonly_fields = ["name", "email", "topic", "message", "created_at"]


admin.site.register(Profile)
admin.site.register(Experience)
admin.site.register(Education)
