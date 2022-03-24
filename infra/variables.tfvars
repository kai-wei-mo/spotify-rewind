aws_region    = "us-east-1"
ami           = "ami-04505e74c0741db8d" # Ubuntu Server 20.04 LTS (HVM), SSD Volume Type (64-bit x86)
instance_type = "t2.micro"

iam_instance_profile   = "spotify-rewind-i"
key_name               = "spotify-rewind-kp"
vpc_security_group_ids = ["sg-0d50e8a32baa5ccec"] # spotify-rewind-sg

tags = {
    "Name": "spotify-rewind",
}
