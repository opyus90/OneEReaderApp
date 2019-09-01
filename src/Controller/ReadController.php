<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use App\Entity\Books;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\HeaderUtils;


class ReadController extends AbstractController
{
	private $appKernel;
	

    public function __construct(KernelInterface $appKernel)
    {
        $this->appKernel = $appKernel;
		
    }
	
    /**
     * @Route("/article/{name}", name="book_reader")
     */
    public function booksList($name)
    {
		
		$books = $this->getDoctrine()
                      ->getRepository(Books::class)
                      //->findAllByField('Titles');
                      //->findAll();
					  ->findAllBooksPage();
					  
        if (!$books) {
            throw $this->createNotFoundException(
              'No product found for books'
            );
        }
		
		return $this->render('book/all.html.twig', [
			'books' => $books,
			'keyinit' => $name,
        ]);
		
		
    }
	
	/**
     * @Route("/book-single/{name}", name="book_single")
     */
    public function bookSingle($name)
    {

		$book = $this->getDoctrine()
                     ->getRepository(Books::class)
					 ->findAllSingleBookPage($name);
					  
        if (!$book) {
            throw $this->createNotFoundException(
              'No product found for book '
            );
        }
		
		
        
		return $this->render('book/book-single.html.twig', [
		    'title' => $name,
            'book' => $book,
			
        ]);
		
    }
	
	/**
     * @Route("/book-update/update/{username}/{name}/{vote}", name="book_update")
     */
	 public function updateBook($username, $name, $vote)
	{
		$arr = [];
		$voted = false;
		$entityManager = $this->getDoctrine()->getManager();
		$book = $entityManager->getRepository(Books::class)->findOneBy(['Titles' => ''.$name.'']);
		$userBook = $entityManager->getRepository(User::class)->findOneBy(['email' => ''.$username.'']);
		
        if (!$book && !$userBook) {
            throw $this->createNotFoundException(
                  'No product found for title '.$name
            );
        }
		$act = $userBook->getActions();
		
		$actions = json_decode($act, true);
		foreach ($actions as $action) {
			
            if ($action["Title"] == $name) {
			    $action["Vote"] = $vote;
				$voted = true;
			} 
			array_push($arr, $action);
			
        }
		if (!$voted){
			$obj = array('Title' => $name, 'Vote' => $vote, 'Comment' => '') ;
			array_push($arr, $obj);
		}
		$userBook->setActions(json_encode($arr));
		
		$number = $book->getVoted();
		$rate = $book->getVotes();
        $finalvote = ($vote+($rate*$number)) / ($number+1);
        $book->setVoted($number+1);
		$book->setVotes($finalvote);
		
        $entityManager->flush();
		$book = $entityManager->getRepository(Books::class)->findOneBy(['Titles' => ''.$name.'']);
		$myObj = array( 'vote' => $book->getVotes(), 'voted' => $book->getVoted() );
		
        $response = json_encode($myObj);
		
		return new Response($response);
	}
	
	/**
     * @Route("/book-comment/update/{username}/{name}/{comment}", name="book_comment")
     */
	 public function commentBook($username, $name, $comment, Request $request)
	{
		$arr = [];
		$commented = false;
		$entityManager = $this->getDoctrine()->getManager();
		$userBook = $entityManager->getRepository(User::class)->findOneBy(['email' => ''.$username.'']);
		
        if (!$userBook) {
            throw $this->createNotFoundException(
                  'No product found for title '.$name
            );
        }
		$act = $userBook->getActions();
		
		$data = $request->getContent();
		$actions = json_decode($act, true);
		foreach ($actions as $action) {
			
            if ($action["Title"] == $name) {
			    $action["Comment"] = $data;
				$commented = true;
			} 
			array_push($arr, $action);
			
        }
		if (!$commented){
			$obj = array('Title' => $name, 'Vote' => 0, 'Comment' => $data) ;
			array_push($arr, $obj);
		}
		$userBook->setActions(json_encode($arr));
		
        $entityManager->flush();
		
		
		return new Response("success");
	}
	
	/**
     * @Route("/book-user/{username}/{title}/{vote}/{comment}", name="book_user")
     */
	public function bookUser($username, $title, $vote, $comment){
		$entityManager = $this->getDoctrine()->getManager();
		$userBook = $entityManager->getRepository(User::class)->findOneBy(['email' => ''.$username.'']);

        $act = $userBook->getActions();
		
		$actions = json_decode($act, true);
		
        if (!$userBook) {  //!$userBook
            throw $this->createNotFoundException(
                  'No product found for title '.$actions  //$username
            );
        }

		$arr = [];
		$response = [];

		$response["Vote"] = false;
		$response["Comment"] = false;
		
		foreach ($actions as $action) {
			
            if ($action["Title"] == $title) {
			    ((float)$action["Vote"] > 0) ? $response["Vote"] = true : $response["Vote"] = false;
				(strlen($action["Comment"]) > 0) ? $response["Comment"] = true : $response["Comment"] = false;
				$titleExist = true;
			} 
			//array_push($arr, $action);
			
        }
		
		
		return new Response(json_encode($response));
	}
	
	/**
     * @Route("/all-comments/{title}", name="all_comments")
     */
	public function getComments($title){
		$entityManager = $this->getDoctrine()->getManager();
		$usersComments = $entityManager->getRepository(User::class)->findAllByField('Actions');

		
        if (!$usersComments) {  //!$userBook
            throw $this->createNotFoundException(
                  'No product found for title '.$title  //$username
            );
        }

		
		$response = [];
		
		foreach ($usersComments as $comment) {
			$arr = [];
			
			$email = $comment["email"];
			$actions = json_decode($comment["Actions"], true);
			
			foreach ((array)$actions as $c) {
              if ( $c["Title"] == $title ) {
				$arr[$email] = $c["Comment"];  
			    array_push($response, $arr);
			  } 
			  //array_push($arr, $action);
			}
			
        }
		
		
		return new Response(json_encode($response));
	}
	
	/**
     * @Route("/book/{action}/{name}", name="book_open")
     */
	public function bookPdf($action, $name)
    {
        $nameStr = strval($name);
		$publicPath = $this->appKernel->getProjectDir() . '/public/books/';
		$pdfPath = $publicPath.$nameStr.'.pdf';

        if ($action == 'read') {
		    return $this->file($pdfPath, $nameStr.'.pdf', ResponseHeaderBag::DISPOSITION_INLINE);
		} else {
			$entityManager = $this->getDoctrine()->getManager();
		    $book = $entityManager->getRepository(Books::class)->findOneBy(['Titles' => ''.$name.'']);

            $number = $book->getDownloads();
		
            if (!$book) {
                throw $this->createNotFoundException(
                  'No product found for title '.$name
                );
            }
            
            $book->setDownloads($number+1);
            $entityManager->flush();
			
			return $this->file($pdfPath, $nameStr.'.pdf', ResponseHeaderBag::DISPOSITION_ATTACHMENT);
		}

    }
}
