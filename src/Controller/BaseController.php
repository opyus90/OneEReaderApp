<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BaseController extends AbstractController
{
    /**
     * @Route("/", name="base_router")
     */
    public function number()
    {
        $number = random_int(0, 100);

        
		return $this->render('base.html.twig', [
            'number' => $number,
        ]);
    }
}
