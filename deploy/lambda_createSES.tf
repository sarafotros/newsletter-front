data "archive_file" "createSES" {
  type = "zip"

  source_file = "${path.module}/lambda_createSES.js"
  output_path = "${path.module}/lambda_createSES.zip"
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

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

data "aws_iam_policy" "lambdaSes_basic_exec" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

## Attach execution policy to execution role
resource "aws_iam_role_policy_attachment" "lambdaSes_basic_exec" {
  role = aws_iam_role.iam_for_lambda.name
  policy_arn = data.aws_iam_policy.lambdaSes_basic_exec.arn
}


// SES policy
resource "aws_iam_role_policy_attachment" "ses_policy_attachment" {
  role = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.ses_iam_policy.arn
}
resource "aws_iam_policy" "ses_iam_policy" {
  name = "ses-createSub"
  policy = data.aws_iam_policy_document.ses_policy_document.json
}

data "aws_iam_policy_document" "ses_policy_document" {
  statement {
    effect = "Allow"
    actions = [
     "ses:SendEmail"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_lambda_function" "createSES" {
  filename = "${path.module}/lambda_createSES.zip"
  function_name = "createSES"
  role = aws_iam_role.iam_for_lambda.arn
  handler = "lambda_createSES.handler"
  source_code_hash = data.archive_file.createSES.output_base64sha256
  runtime = "nodejs12.x"
  # in seconds
  timeout = 10
}

resource "aws_cloudwatch_log_group" "createSES" {
  name              = "/aws/lambda/createSES"
  retention_in_days = 14
}