<?php
// src/Controller/ContactController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ContactController extends AbstractController
{
	private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
	
    /**
     * @Route("/contact", name="contact_us")
     */
    public function contactUs()
    {
        $number = random_int(0, 100);
        
        
		return $this->render('contact/contact.html.twig', [
            //'pageH1' => $pageH1,
			'name' => $number,
        ]);
    }
	/**
     * @Route("/sendmsg", name="send_msg")
     */
	
	public function sendMsg()
    {
		//$adress = strval($adress);
		// do anything else you need here, like send an email
		$fname = isset($_POST["c_fname"]) && !empty($_POST["c_fname"]) ? $_POST["c_fname"] : false;
		$lname = isset($_POST["c_lname"]) && !empty($_POST["c_lname"]) ? $_POST["c_lname"] : false;
		$adress = isset($_POST["c_email"]) && !empty($_POST["c_email"]) ? $_POST["c_email"] : false;
		$subject = isset($_POST["c_subject"]) && !empty($_POST["c_subject"]) ? $_POST["c_subject"] : false;
		$msg = isset($_POST["c_message"]) && !empty($_POST["c_message"]) ? $_POST["c_message"] : false;
		
		switch (false) {
          case $fname:
            return $this->redirectToRoute('contact_us');
            break;
          case $lname:
            return $this->redirectToRoute('contact_us');
            break;
          case $adress:
            return $this->redirectToRoute('contact_us');
            break;
		  case $subject:
            return $this->redirectToRoute('contact_us');
            break;
		  case $msg:
            return $this->redirectToRoute('contact_us');
            break;
          default:		
            $email = (new Email())
            ->from('oneereader@gmail.com')
            ->to('opyus@yahoo.it')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject($subject)
            ->text('Contact text')
            ->html('<p>From <strong>'.$fname.' '.$lname.'</strong><br>The email adress is: <strong>'.$adress.'</strong><br><br>'.$msg.'</p>');

            $this->mailer->send($email);
			
            return $this->redirectToRoute('base_router');
		}
		
	}
}
