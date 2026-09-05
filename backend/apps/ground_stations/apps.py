from __future__ import annotations

from django.apps import AppConfig


class GroundStationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.ground_stations"
    label = "ground_stations"
    verbose_name = "Ground Stations"
