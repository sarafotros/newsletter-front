# resource "aws_sqs_queue" "q" {
#   name = "examplequeue"
# }

# resource "aws_sqs_queue_policy" "test" {
#   queue_url = aws_sqs_queue.q.id

#   policy = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Id": "sqspolicy",
#   "Statement": [
#     {
#       "Sid": "First",
#       "Effect": "Allow",
#       "Principal": "*",
#       "Action": "sqs:SendMessage",
#       "Resource": "${aws_sqs_queue.q.arn}",
#       "Condition": {
#         "ArnEquals": {
#           "aws:SourceArn": "${aws_sns_topic.example.arn}"
#         }
#       }
#     }
#   ]
# }
# POLICY
# }
# resource "aws_sqs_queue" "terraform_queue" {
#   name                      = "terraform-example-queue"
#   delay_seconds             = 90
#   max_message_size          = 2048
#   message_retention_seconds = 86400
#   receive_wait_time_seconds = 10
#   redrive_policy = jsonencode({
#     deadLetterTargetArn = aws_sqs_queue.terraform_queue_deadletter.arn
#     maxReceiveCount     = 4
#   })

#   tags = {
#     Environment = "production"
#   }
