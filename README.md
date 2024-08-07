## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

### Examples (DEVELLOPMENT)
### Lien des textures mapcat
https://github.com/emmelleppi/matcaps/blob/master/PAGE-2.md

Ouvrir [http://localhost:3000](http://localhost:3000) 

### Preview du classement des Ambassadors
http://localhost:3000/leaderboard/preview
### Preview d'un event avec des Ambassadors
http://localhost:3000/event/preview

### Render a 2D image of a 3D model

On envoie à l'API plusieurs paramètre personnalisable comme  
{
HEAD,
GLASS,
CLOTHE,
TONGUE,
TEETH,
SKIN,
EYEBROWS,
HAIR,
NECKLACE
}

Leaderboard Render Example (local):
http://localhost:3001/leaderboard/render?HEAD=Head1&NECK=Neck1&NOOSE=Noose1&EARINGS=Earings1&EAR=Ear1&EYE=Eye1&NECKLACE=Necklace1&HAIR=Hair1&GLASS=Glass1&CLOTHE=Clothe1&TEETH=Teeth1&TONGUE=Tongue1&RANK=1
or add this after your localhost url:
/render/leaderboard?HEAD=Head1&NECK=Neck1&NOOSE=Noose1&EAR=Ear1&EYE=Eye1&NECKLACE=Necklace1&HAIR=Hair1&GLASS=Glass1&CLOTHE=Clothe1&TEETH=Teeth1&TONGUE=Tongue1&RANK=1

Production example (vercel app):
https://dev-ambassador-userverless-3d-avatar-rendering-api-3o38w1j0e.vercel.app/render/leaderboard?HEAD=Head1&NECK=Neck1&NOOSE=Noose1&EARINGS=Earings1&EAR=Ear1&EYE=Eye1&NECKLACE=Necklace1&HAIR=Hair1&GLASS=Glass1&CLOTHE=Clothe1&TEETH=Teeth1&TONGUE=Tongue1&RANK=1
