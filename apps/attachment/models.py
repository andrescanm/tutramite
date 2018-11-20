from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.
from ..formality.models import Formality


class AttachmentFormality(models.Model):
	formality = models.ForeignKey(
		Formality,
		related_name='attachments',
		on_delete=models.CASCADE
	)
	attachment = models.FileField(
		upload_to='formality_docs/',
		validators=[FileExtensionValidator(
			allowed_extensions=['xls', 'xlsx', 'pdf', 'doc', 'docx', 'odt']
		)],
		max_length=45
	)

	def __str__(self):
		extension, name = self.attachment.name.split('/')
		return name

