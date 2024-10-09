import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
import { ApiService } from '../api-service.service';
import { DateFormatService } from '../date-format.service';
import { loginUser } from '../store/auth/auth-action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  @Input() visible = false;
  @Input() section: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  user$: Observable<User | null>;
  editInfoPerso!: FormGroup;
  editSkills!: FormGroup;
  editLanguages!: FormGroup;
  constructor(
    private store: Store<UserState>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private dateService: DateFormatService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.editInfoPerso = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      github: ['', Validators.required],
      linkedin: ['', Validators.required],
      vehicle: ['', Validators.required],
    });

    this.editSkills = this.fb.group({
      skills: this.fb.array([]),
    });
    this.editLanguages = this.fb.group({
      languages: this.fb.array([]),
    });
    this.user$.subscribe((user) => {
      if (user) {
        this.editInfoPerso.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          birthDate: user.birthDate,
          address: user.address,
          website: user.website,
          github: user.github,
          linkedin: user.linkedin,
          vehicle: user.vehicle,
        });
        const skillsArray = this.editSkills.get('skills') as FormArray;
        skillsArray.clear();
        user.skills.forEach((skill) => {
          skillsArray.push(
            this.fb.group({
              name: [skill.name, Validators.required],
            })
          );
        });
        const languagesArray = this.editLanguages.get('languages') as FormArray;
        languagesArray.clear();
        user.languages.forEach((language) => {
          languagesArray.push(
            this.fb.group({
              name: [language.name, Validators.required],
            })
          );
        });
      }
    });
  }

  get skills(): FormArray {
    return this.editSkills.get('skills') as FormArray;
  }

  get languages(): FormArray {
    return this.editLanguages.get('languages') as FormArray;
  }
  addInfo(section: string) {
    if (section === 'skills') {
      this.skills.push(
        this.fb.group({
          name: ['', Validators.required],
        })
      );
    }else if(section === "languages"){
      this.languages.push(
        this.fb.group({
          name: ['', Validators.required],
        })
      );
    }
  }

  removeInfo(section: string, index: number) {
    if (section === 'skills') {
      this.skills.removeAt(index);
    }else if (section==="languages"){
      this.languages.removeAt(index);
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  saveChanges(section: string) {
    console.log(section);
    if (section === 'informations') {
      if (this.editInfoPerso.valid) {
        const updatedUser = this.editInfoPerso.value;
        this.close();
        this.user$.pipe(take(1)).subscribe((user) => {
          if (user) {
            this.apiService
              .postDataWithToken(`user/${user.id}/info`, updatedUser)
              .subscribe({
                next: (response) => {
                  if (response) {
                    this.apiService
                      .getDataWithToken(`user/${user.id}`)
                      .subscribe({
                        next: (userResponse) => {
                          this.store.dispatch(
                            loginUser({
                              user: {
                                id: userResponse.id,
                                firstName: userResponse.firstName,
                                lastName: userResponse.lastName,
                                birthDate: this.dateService.formatDate(
                                  userResponse.birthDate
                                ),
                                photoProfile: userResponse.photoProfile,
                                linkId: userResponse.linkId,
                                email: userResponse.email,
                                phone: userResponse.phone,
                                address: userResponse.address,
                                website: userResponse.website,
                                github: userResponse.github,
                                linkedin: userResponse.linkedin,
                                vehicle: userResponse.vehicle,
                                role: userResponse.role,
                                drivingLicenses: userResponse.drivingLicenses,
                                socialLinks: userResponse.socialLinks,
                                languages: userResponse.languages,
                                skills: userResponse.skills,
                                experiences: userResponse.experiences,
                                educations: userResponse.educations,
                              },
                            })
                          );
                        },
                        error: (error) => {
                          console.error(
                            "Erreur lors de la récupération des données de l'utilisateur :",
                            error
                          );
                        },
                      });
                  } else {
                    console.warn('Aucun reçu dans la réponse');
                  }
                },
                error: (error) => {
                  console.error('Erreur lors de la mise à jour :', error);
                },
              });
          }
        });
      }
    } else if (section === 'skills') {
      const updatedSkills = this.editSkills.value.skills;
      console.log(updatedSkills);
      this.user$.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.apiService
            .postDataWithToken(`user/${user.id}/skills`, updatedSkills)
            .subscribe({
              next: (response) => {
                this.apiService
                  .getDataWithToken(`user/${user.id}`)
                  .subscribe((userResponse) => {
                    this.store.dispatch(
                      loginUser({
                        user: {
                          ...userResponse,
                          skills: userResponse.skills, 
                        },
                      })
                    );
                  });
              },
              error: (error) =>
                console.error(
                  'Erreur lors de la mise à jour des compétences:',
                  error
                ),
            });
        }
      });
    } else if (section === 'languages') {
      const updatedLanguage = this.editLanguages.value.languages;
      this.user$.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.apiService
            .postDataWithToken(`user/${user.id}/languages`, updatedLanguage)
            .subscribe({
              next: (response) => {
                this.apiService
                  .getDataWithToken(`user/${user.id}`)
                  .subscribe((userResponse) => {
                    this.store.dispatch(
                      loginUser({
                        user: {
                          ...userResponse,
                          languages: userResponse.languages,
                        },
                      })
                    );
                  });
              },
              error: (error) =>
                console.error(
                  'Erreur lors de la mise à jour des compétences:',
                  error
                ),
            });
        }
      });
    }
    this.close();
  }
}
