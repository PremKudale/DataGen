import logging
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .gemini_service import generate_synthetic_data

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def generate_synthetic_data_view(request):
    try:
        logger.info("Received request to generate synthetic data")
        data = json.loads(request.body)
        schema = data.get('schema', [])
        num_rows = data.get('num_rows', 100)

        logger.info(f"Parsed request data: schema={schema}, num_rows={num_rows}")

        if not schema:
            logger.warning("No schema provided in the request")
            return HttpResponse('Schema is required', status=400)

        # Generate synthetic data using your existing function
        logger.info("Calling generate_synthetic_data function")
        synthetic_data = generate_synthetic_data(schema, num_rows)
        logger.info(f"Generated synthetic data")

        # The synthetic_data is already a CSV string, so we can return it directly
        response = HttpResponse(synthetic_data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="synthetic_data.csv"'
        response['Access-Control-Expose-Headers'] = 'Content-Disposition'

        logger.info("Returning CSV response")
        return response

    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {str(e)}")
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        logger.exception(f"Unexpected error in generate_synthetic_data_view: {str(e)}")
        return HttpResponse(str(e), status=500)
