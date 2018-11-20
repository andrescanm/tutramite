from rest_framework import serializers

from .models import Formality


class FormalitySerializer(serializers.ModelSerializer):
	class Meta:
		model = Formality
		fields = (
			'slug',
			'name',
			'description',
			'requirements',
			'realization_form',
			'schedule',
			'civil_servant'
		)
