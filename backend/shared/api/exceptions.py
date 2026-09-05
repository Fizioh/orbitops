from __future__ import annotations

from typing import Any

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

from shared.errors import OrbitOpsError


def orbitops_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    if isinstance(exc, OrbitOpsError):
        payload = {
            "error": {
                "code": exc.detail.code.value,
                "message": exc.detail.message,
                "reason": exc.detail.reason,
                "details": exc.detail.details or {},
            }
        }
        http_status = (
            status.HTTP_404_NOT_FOUND
            if exc.detail.code.value == "NOT_FOUND"
            else status.HTTP_400_BAD_REQUEST
        )
        return Response(payload, status=http_status)

    return exception_handler(exc, context)
