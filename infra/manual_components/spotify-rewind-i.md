## Creation
aws iam create-instance-profile --instance-profile-name spotify-rewind-i
aws iam add-role-to-instance-profile --instance-profile-name spotify-rewind-i --role-name spotify-rewind-r

## Destruction
aws iam remove-role-from-instance-profile --instance-profile-name spotify-rewind-i --role-name spotify-rewind-r
aws iam delete-instance-profile --instance-profile-name spotify-rewind-i

## Misc
aws iam get-instance-profile --instance-profile-name spotify-rewind-i
