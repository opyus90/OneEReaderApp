<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BooksRepository")
 */
class Books
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Titles;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Author;

    /**
     * @ORM\Column(type="string", length=300, nullable=true)
     */
    private $Description;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Votes;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $Downloads;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Category;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $Voted;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitles(): ?string
    {
        return $this->Titles;
    }

    public function setTitles(string $Titles): self
    {
        $this->Titles = $Titles;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->Author;
    }

    public function setAuthor(?string $Author): self
    {
        $this->Author = $Author;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(?string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getVotes(): ?float
    {
        return $this->Votes;
    }

    public function setVotes(?float $Votes): self
    {
        $this->Votes = $Votes;

        return $this;
    }

    public function getDownloads(): ?int
    {
        return $this->Downloads;
    }

    public function setDownloads(?int $Downloads): self
    {
        $this->Downloads = $Downloads;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->Category;
    }

    public function setCategory(?string $Category): self
    {
        $this->Category = $Category;

        return $this;
    }

    public function getVoted(): ?int
    {
        return $this->Voted;
    }

    public function setVoted(?int $Voted): self
    {
        $this->Voted = $Voted;

        return $this;
    }
}
