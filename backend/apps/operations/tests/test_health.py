from __future__ import annotations

from django.conf import settings
from rest_framework.test import APIClient


def test_health_endpoint() -> None:
    client = APIClient()
    response = client.get("/api/health/")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["service"] == "orbitops-api"
    assert payload["demo_mode"] is True
    assert settings.TIME_ZONE == "UTC"
