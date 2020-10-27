data "archive_file" "createSub" {
  type = "zip"

  source_file = "${path.module}/lambda_createSub.js"
  output_path = "${path.module}/lambda_createSub.zip"
}

resource "aws_iam_role" "iam_for_subscriber" {
  name = "subscribe-lambda-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

data "aws_iam_policy" "lambda_basic_exec" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

## Attach execution policy to execution role
resource "aws_iam_role_policy_attachment" "lambda_basic_exec" {
  role = aws_iam_role.iam_for_subscriber.name
  policy_arn = data.aws_iam_policy.lambda_basic_exec.arn
}
// DynamoDB policy
resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
  role = aws_iam_role.iam_for_subscriber.name
  policy_arn = aws_iam_policy.dynamodb.arn
}
resource "aws_iam_policy" "dynamodb" {
  name = "dynamo-db-createSub"
  policy = data.aws_iam_policy_document.dynamodb_policy_document.json
}

data "aws_iam_policy_document" "dynamodb_policy_document" {
  statement {
    effect = "Allow"
    actions = [
     "dynamodb:PutItem"
    ]
    resources = [
      "*"
    ]
  }
}
// SQS policy
resource "aws_iam_role_policy_attachment" "sqs_policy_attachment" {
  role = aws_iam_role.iam_for_subscriber.name
  policy_arn = aws_iam_policy.sqs_iam_policy.arn
}
resource "aws_iam_policy" "sqs_iam_policy" {
  name = "sqs-createSub"
  policy = data.aws_iam_policy_document.sqs_policy_document.json
}

data "aws_iam_policy_document" "sqs_policy_document" {
  statement {
    effect = "Allow"
    actions = [
     "sqs:SendMessage",
    ]
    resources = [
      "*"
    ]
  }
}


resource "aws_lambda_function" "createSub" {
  filename = "${path.module}/lambda_createSub.zip"
  function_name = "createSub"
  role = aws_iam_role.iam_for_subscriber.arn
  handler = "lambda_createSub.handler"
  source_code_hash = data.archive_file.createSub.output_base64sha256
  runtime = "nodejs12.x"
  # in seconds
  timeout = 10
}

resource "aws_cloudwatch_log_group" "createSub" {
  name              = "/aws/lambda/createSub"
  retention_in_days = 30
}