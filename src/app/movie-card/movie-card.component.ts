import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { GenreComponent } from "../genre/genre.component";
import { DirectorComponent } from "../director/director.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    })
  }

  onToggleFavMovie(id: string): void {
    if (!this.favoriteMovies.includes(id)) {
      this.fetchApiData.addFavoriteMovie(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Movie added to favourites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    } else {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((res) => {
        this.favoriteMovies = res.FavoriteMovies;
        this.snackBar.open('Movie removed from favourites.', 'OK', {
          duration: 3000
        })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    }
  }

  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: "director-dialog-background",
      width: "400px",
    });
  }

  openMovieDetails(movie: any): void {
    const { Name, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Name, Description },
      panelClass: "synopsis-dialog-background",
      width: "400px",
    });
  }
}