from django import forms

from .models import Entity


class EntityForm(forms.ModelForm):
	class Meta:
		model = Entity
		fields = ('name', 'nit', 'address', 'telephone', 'website')

		labels = {
			'name': 'Nombre',
			'nit': 'NIT',
			'address': 'Dirección',
			'telephone': 'Teléfono',
			'website': 'Página Web'
		}

		widgets = {
			'name': forms.TextInput(attrs={
				'class': 'form-control',
				'placeholder': 'Nombre Entidad'
			}),
			'nit': forms.TextInput(attrs={
				'class': 'form-control',
				'placeholder': 'Ingrese su NIT...'
			}),
			'address': forms.TextInput(attrs={
				'class': 'form-control',
				'placeholder': 'Carrera 23 # 54 - 23, Bogotá Colombia'
			}),
			'telephone': forms.TextInput(attrs={
				'class': 'form-control',
				'placeholder': 'Ingrese su número telefónico'
			}),
			'website': forms.URLInput(attrs={
				'class': 'form-control',
				'placeholder': 'https://www.mintic.gov.co'
			})
		}
