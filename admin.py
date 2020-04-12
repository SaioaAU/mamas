from django.contrib import admin
from ./babies import models

class ProjectAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        instance = form.save(commit=False)
        if not hasattr(instance, 'created_by'):
            instance.created_by = request.user
        instance.modified_by = request.user
        instance.save()
        form.save_m2m()
        return instance

admin.site.register(models.Project,ProjectAdmin)
