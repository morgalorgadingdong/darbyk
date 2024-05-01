export const checkInsTemplate = {
    checkIn0: {
        complete: false,
        dateCompleted: '',
        agreement: {
            routineAdjustmentConsent: false,
            communicationOnSkinIrritationConsent: false,
            exclusiveProductUseConsent: false,
            noRoutineChangeWithoutConsultationConsent: false,
            noRunningOutOfProductConsent: false,
            noOtherSkincareTreatmentsConsent: false,
            medicationChangeDisclosureConsent: false,
            dailySunscreenUseConsent: false,
            noSunOrWindBurnConsent: false,
            laserTreatmentDisclosureConsent: false,
            pregnancyDisclosureConsent: false,
            rightToDeclineTreatmentConsent: false,
            agreement: {
                name: "",
                date: ""
            }
        },
        questionnnaire: {
            age: '',
            dob: "",
            ethnicity: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            cellPhone: "",
            otherPhone: "",
            email: "",
        
            medicationUsage: {
                antibioticsOral: { when: "", duration: "" },
                antibioticsTopical: { when: "", duration: "" },
                accutane: { when: "", duration: "" },
                benzoylPeroxide: { when: "", duration: "" },
                retinoids: { when: "", duration: "" }, // Includes Retin-A, Tazorac, Differin
                thyroidMedication: { when: "", duration: "" }
            },
            medicalHistory: {
                herpesSimplex: false,
                hivAids: false,
                hemophilia: false,
                eczema: false,
                thyroidProblems: false,
                lupus: false,
                psoriasis: false,
                hormoneProblems: false,
                anemia: false,
                hepatitis: false,
                hysterectomy: false,
                highBloodPressure: false,
                cancer: false,
                ovariesRemoved: false,
                diabetes: false,
                staphInfectionMRSA: false,
                pacemaker: false,
                metalPinsInBody: false
            },
            physicianCare: {
                underCare: false,
                doctorsName: "",
                phone: ""
            },
            additionalMedications: "",
            lifestyle: {
                reactionToProducts: { hadReaction: false, products: "" },
                allergies: {
                sulfur: false,
                aspirin: false,
                latex: false,
                others: ""
                },
                smokingVaping: { doesSmoke: false, substance: "" },
                usesFabricSoftener: false,
                swimsInChlorinatedPool: false,
                worksAroundChemicals: false,
                occupation: "",
                worksNights: false,
                underStress: false,
                birthControl: { uses: false, type: "", brand: "" },
                pregnantOrNursing: false,
                shavingIrritation: { hasIrritation: false, razorType: "" }
            },
            diet: {
                fastFood: "",
                processedFood: "",
                saltySnacks: "",
                milkYogurt: "",
                cheese: "",
                wheyOrSoyProtein: "",
                peanutButter: "",
                vitaminsSupplements: "",
                peanuts: "",
                sushi: "",
                kelpAndSeaweed: "",
                misoSoup: "",
                soy: "",
                seafood: ""
            },
            currentProducts: {
                cleanser: "",
                toner: "",
                serums: "",
                moisturizers: "",
                sunscreen: "",
                mask: "",
                foundation: "",
                blush: "",
                exfoliant: "",
                acneMedications: "",
                other: ""
            },
            skincare: {
                heardAboutUs: "",
                usedFaceRealityProducts: { used: false, products: [] },
                currentlyUsingFaceRealityProducts: false
            },
            otherTreatments: {
                chemicalPeels: { when: "", where: "", type: "" },
                microdermabrasion: { when: "", where: "" },
                dermabrasion: { when: "", where: "" },
                laserHairRemoval: { when: "", where: "" },
                laserRejuvenationResurfacing: { when: "", where: "" },
                skinCancerRemoval: { when: "", where: "" },
                facialWaxing: { when: "", where: "" },
                electrolysis: { when: "", where: "" },
                other: { when: "", where: "" }
            }
        }   
    },
    checkIn1: {
        dueDate: '',
        number: 1,
        status: 'active', // inactive, active, submitted, reviewed, completed
        active: true,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn2: {
        dueDate: '',
        number: 2,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn3: {
        dueDate: '',
        number: 3,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn4: {
        dueDate: '',
        number: 4,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn5: {
        dueDate: '',
        number: 5,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn6: {
        dueDate: '',
        number: 6,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn7: {
        dueDate: '',
        number: 7,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn8: {
        dueDate: '',
        number: 8,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    },
    checkIn9: {
        dueDate: '',
        number: 9,
        status: 'inactive', // inactive, active, submitted, reviewed, completed
        active: false,
        submitted: false,
        reviewed: false,
        questions: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
        },
        emailReminders: {
            emailReminder1: false,
            emailReminder2: false,
            emailReminder3: false
        },
        pictures: {
            picURL1: '',
            picURL2: '',
            picURL3: ''
        },
        response: {
            routine: '',
            comments: ''
        }
    }
}