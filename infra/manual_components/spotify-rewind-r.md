## Name
spotify-rewind-r

## ARN
arn:aws:iam::483469416043:role/spotify-rewind-r

## Policy
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "EC2TrustPolicy",
            "Effect": "Allow",
            "Principal": {
                "Service": "ec2.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}

## Policy
spotify-rewind-p
