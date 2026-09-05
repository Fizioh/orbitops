from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Seed the OrbitOps demo constellation dataset (Phase 1+)."

    def handle(self, *args: object, **options: object) -> None:
        self.stdout.write(
            self.style.WARNING(
                "seed_demo placeholder: demo dataset lands with Phase 1/2 domain models."
            )
        )
