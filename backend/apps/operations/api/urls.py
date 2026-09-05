from __future__ import annotations

from django.urls import path

from apps.operations.api.views import health

urlpatterns = [
    path("health/", health, name="health"),
]
