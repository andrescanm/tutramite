from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db import models

# Create your models here.
from django.utils.text import slugify

from ..core.mixins import TimeStampedModel
from ..entity.models import Entity


class CivilServant(User, TimeStampedModel):
	IDENTIFICATION_TYPE = (
		('', '- Seleccione -'),
		('cc', 'Cédula de ciudadania'),
		('ce', 'Cédula de extranjería'),
		('pasaporte', 'Pasaporte')
	)
	slug = models.SlugField(unique=True, blank=True, null=True)
	identification_type = models.CharField(
		max_length=45,
		choices=IDENTIFICATION_TYPE
	)
	identification = models.CharField(
		max_length=45,
		unique=True,
		verbose_name='N° ID'
	)
	telephone = models.CharField(max_length=45)
	address = models.CharField(max_length=100)
	avatar = models.ImageField(
		upload_to='avatars',
		validators=[
			FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])
		],
		blank=True,
		null=True
	)
	entity = models.ForeignKey(
		Entity,
		related_name='civil_servants',
		on_delete=models.CASCADE
	)

	def __str__(self):
		return self.get_full_name()

	def save(self, *args, **kwargs):
		self.slug = slugify(self.get_full_name())
		self.set_password(self.password)
		name, extension = self.avatar.file.name.split('.')
		self.avatar.name = f'{self.identification}.{extension}'
		super().save(*args, **kwargs)
