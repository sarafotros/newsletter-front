var ses = new aws.SES({region: 'eu-west-2'});

exports.handler = (event, context, callback) => {
  const  email = event.Records[0].body;
  //   part1: sending email
  const htmlBody = `
     <!DOCTYPE html>
     <html>
      <head>
      </head>
      <body style="height: 100%; margin: 2%; background: #fff; padding:2% ;
      font-family: 'Comic Sans MS';">
        <div style="background-image:url('https://raw.githubusercontent.com/ColorlibHQ/email-templates/master/10/images/email.png'); background-repeat: no-repeat;
          background-position: center;
           background-repeat:no-repeat;
            background-size:initial;
             padding:8%;
             background-color: #edf2fa99;" >
          <h1>
                Welcome to My <a href='https://www.moonpig.com/uk/'>Moonpig</a>!
          </h1>
             <h2 style="font-size:22px; ">Hi ${email},</h2>
             <h3 style="font-size:20px; ">Thanks for joinin the Moonpig community </h3>
             <p style="font-size:16px; ">Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”
                 As Cicero would put it, “Um, not so fast.”</p>
             <p style="font-size:16px; ">The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin.</p>
             <div style="height:100%;">
              <img src='https://seeklogo.com/images/M/moonpig-logo-AED2FFA4AE-seeklogo.com.png' width="140" height="130" alt='logo'/>
            </div>
        </div>
      </body>
     </html>
  `;

  const textBody = `
     Hi ${email},
     ...
  `;
  // Create sendEmail params
  const emailParams = {
     Destination: {
      ToAddresses: [email]
     },
     Message: {
      Body: {
         Html: {
          Charset: "UTF-8",
          Data: htmlBody
         },
         Text: {
          Charset: "UTF-8",
          Data: textBody
         }
      },
      Subject: {
         Charset: "UTF-8",
         Data: "Thanks for subscribing!"
      }
     },
     Source: "ajambandmusic@gmail.com"
  };

    
     let params = {
         Destination: {
      ToAddresses: [email]
      },
     Message: {
      Body: {
         Html: {
          Charset: "UTF-8",
          Data: htmlBody
         },
         Text: {
          Charset: "UTF-8",
          Data: textBody
         }
         },
      Subject: {
         Charset: "UTF-8",
         Data: "Thanks for subscribing!"
        }
        },
      Source: "ajambandmusic@gmail.com"
    };

     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            context.fail(err);
        } else {
            context.succeed(event);
        }
    });
};