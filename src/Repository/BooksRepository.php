<?php

namespace App\Repository;

use App\Entity\Books;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Books|null find($id, $lockMode = null, $lockVersion = null)
 * @method Books|null findOneBy(array $criteria, array $orderBy = null)
 * @method Books[]    findAll()
 * @method Books[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BooksRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Books::class);
    }

    /**
    * @return Books[] Returns an array of Books objects
    * @param $value
    */
    public function findAllByField($value)
    {
		$field = strval($value);
        return $this->createQueryBuilder('b')
		    ->select('b.'.$value)
            //->andWhere('b.titles = :val')
            //->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            //->setMaxResults(100)
            ->getQuery()
            ->getResult()
        ;
    }
   
    public function findAllBooksPage()
    {
		
        return $this->createQueryBuilder('b')
		    ->select('b.Titles, b.Author, b.Votes, b.Downloads, b.Category')
            //->andWhere('b.titles = :val')
            //->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            //->setMaxResults(100)
            ->getQuery()
            ->getResult()
        ;
    }
	
	public function findAllSingleBookPage($value)
    {
		
        return $this->createQueryBuilder('b')
		    ->select('b.Titles, b.Author, b.Description, b.Votes, b.Downloads, b.Category, b.Voted')
            ->andWhere('b.Titles = :val')
            ->setParameter('val', $value)
            ->setMaxResults(1)
            ->getQuery()
            ->getResult()
        ;
    }
    /*
    public function findOneBySomeField($value): ?Books
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
