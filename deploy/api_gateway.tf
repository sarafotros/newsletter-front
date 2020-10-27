resource "aws_api_gateway_rest_api" "terra_api" {
  name = "terra_api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "createSub" {
  rest_api_id = aws_api_gateway_rest_api.terra_api.id
  parent_id   = aws_api_gateway_rest_api.terra_api.root_resource_id
  path_part   = "createSub"
}

resource "aws_api_gateway_method" "createSub" {
  rest_api_id   = aws_api_gateway_rest_api.terra_api.id
  resource_id   = aws_api_gateway_resource.createSub.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "createSub" {
  rest_api_id = aws_api_gateway_rest_api.terra_api.id
  resource_id = aws_api_gateway_resource.createSub.id
  http_method = aws_api_gateway_method.createSub.http_method
  integration_http_method = "POST"
  type        = "AWS_PROXY"
  uri         = aws_lambda_function.createSub.invoke_arn
}

resource "aws_api_gateway_deployment" "createSub" {
  depends_on = [aws_api_gateway_integration.createSub]
  rest_api_id = aws_api_gateway_rest_api.terra_api.id
  stage_name  = "dev"

  variables = {
    "timestamp" = timestamp()
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "createSub" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.createSub.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.terra_api.execution_arn}/*/*/*"
}