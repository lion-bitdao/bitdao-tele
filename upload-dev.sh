cd dist-dev
s3cmd put --guess-mime-type * s3://dev-tele.bitdao.com/ --recursive --acl-public
s3cmd modify --add-header="Content-Type: text/css" s3://dev-tele.bitdao.com/index.css
cd ..
