package ma.ensias.sireleve.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendWelcomeMail(String to,String name,String password) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("password", password);

        String html = templateEngine.process("mail/sendPassword", context);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("sireleve@ensias.ma");
        helper.setTo(to);
        helper.setSubject("Here Is Your Password");
        helper.setText(html, true);
        mailSender.send(message);
    }
}
