import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { User, UserState, selectUser } from '../store/auth/auth-reducer';
import { ApiService } from '../api-service.service';
import { DateFormatService } from '../date-format.service';
import { loginUser } from '../store/auth/auth-action';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit  , OnDestroy{
  @Input() visible = false;
  @Input() section: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  user$: Observable<User | null>;
  editInfoPerso!: FormGroup;
  editSkills!: FormGroup;
  editLanguages!: FormGroup;
  editExperiences!: FormGroup;
  editFormations!: FormGroup;
  editPhotoProfile!: FormGroup;
  editors: Editor[] = []; 
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  selectedFile: File | null = null; 
  imagePreview: string | null = null;
  constructor(
    private store: Store<UserState>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private dateService: DateFormatService
    
  ) {
    this.user$ = this.store.select(selectUser);
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editors.forEach(editor => editor.destroy());
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
      description: ['', Validators.required], 
      
    });
    this.editor = new Editor();
    this.editSkills = this.fb.group({
      skills: this.fb.array([]),
    });
    this.editLanguages = this.fb.group({
      languages: this.fb.array([]),
    });
    this.editExperiences = this.fb.group({
      experiences: this.fb.array([]),
    });
    this.editFormations = this.fb.group({
      formations: this.fb.array([]),
    });
    this.editPhotoProfile = this.fb.group({
      photo: [null]
    })
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
          description: user.description,
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
        const experiencesArray = this.editExperiences.get('experiences') as FormArray;
       experiencesArray.clear();
        user.experiences.forEach((experiences) => {
          experiencesArray.push(
            this.fb.group({
              title: [experiences.title, Validators.required],
              company: [experiences.company, Validators.required],              
              location: [experiences.location, Validators.required],              
              startDate: [experiences.startDate, Validators.required],                   
              endDate: [experiences.startDate, Validators.required],
              description: [experiences.description, Validators.required],
            })
          );
        });

        const formationsArray = this.editFormations.get('formations') as FormArray;
        formationsArray.clear();
        user.educations.forEach((formation) => {
          formationsArray.push(
            this.fb.group({
              diplome: [formation.diplome, Validators.required],
              description: [formation.description, Validators.required],              
              school: [formation.school, Validators.required],              
              startDate: [formation.startDate, Validators.required],                   
              endDate: [formation.startDate, Validators.required],
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
  get experiences(): FormArray{
    return this.editExperiences.get('experiences') as FormArray;
  }
  get formations(): FormArray{
    return this.editFormations.get('formations') as FormArray;
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
    }else if(section==="experiences"){
      this.experiences.push(
        this.fb.group({
          title: ['', Validators.required],
          company: ['', Validators.required],              
          location: ['', Validators.required],              
          startDate: ['', Validators.required],                   
          endDate: ['', Validators.required],
          description: ['', Validators.required],
        })
      );
      this.editors.push(new Editor());
    }else if (section === 'formations'){
      this.formations.push(
        this.fb.group({
          diplome: ['', Validators.required],
          description: ['', Validators.required],              
          school: ['', Validators.required],              
          startDate: ['', Validators.required],                   
          endDate: ['', Validators.required],
        })
      );
      this.editors.push(new Editor());
    }
  }

  removeInfo(section: string, index: number) {
    if (section === 'skills') {
      this.skills.removeAt(index);
    }else if (section==="languages"){
      this.languages.removeAt(index);
    }else if(section=== "experiences"){
      this.experiences.removeAt(index);
      this.editors[index].destroy(); 
      this.editors.splice(index, 1);
    }else if(section === 'formations'){
      this.formations.removeAt(index);
      this.editors[index].destroy(); 
      this.editors.splice(index, 1);
    }
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.editPhotoProfile.patchValue({ photo: this.selectedFile }); 
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string; 
      };
      reader.readAsDataURL(this.selectedFile);
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
                                description: userResponse.description,
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
                                scriptPortfolio: userResponse.scriptPortfolio,
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
    }else if(section=== 'experiences'){
      const updatedExperiences = this.editExperiences.value.experiences;

      this.user$.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.apiService
            .postDataWithToken(`user/${user.id}/experiences`, updatedExperiences)
            .subscribe({
              next: (response) => {
                this.apiService
                  .getDataWithToken(`user/${user.id}`)
                  .subscribe((userResponse) => {
                    this.store.dispatch(
                      loginUser({
                        user: {
                          ...userResponse,
                          experiences: userResponse.experiences,
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
    }else if(section=== 'formations'){
      const updatedFormations = this.editFormations.value.formations;
      this.user$.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.apiService
            .postDataWithToken(`user/${user.id}/formations`, updatedFormations)
            .subscribe({
              next: (response) => {
                this.apiService
                  .getDataWithToken(`user/${user.id}`)
                  .subscribe((userResponse) => {
                    this.store.dispatch(
                      loginUser({
                        user: {
                          ...userResponse,
                          educations: userResponse.educations,
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
    }else if(section=== 'photoProfile'){
      const formData = new FormData();
      formData.append('photo', this.editPhotoProfile.get('photo')?.value)
      this.user$.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.apiService
            .postDataWithToken(`user/${user.id}/photo`, formData as any)
            .subscribe({
              next: (response) => {
                this.apiService
                  .getDataWithToken(`user/${user.id}`)
                  .subscribe((userResponse) => {
                    this.store.dispatch(
                      loginUser({
                        user: {
                          ...userResponse,
                         },
                      })
                    );
                    this.imagePreview = null;
                  });
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour de la photo de profil:', error);
              },
            });
        }
      });
    }
    this.close();
  }
}
