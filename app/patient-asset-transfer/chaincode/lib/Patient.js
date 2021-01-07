/**
 * @author Varsha Kamath
 * @email varsha.kamath@stud.fra-uas.de
 * @create date 2021-01-04 19:06:47
 * @modify date 2021-01-04 19:06:47
 * @desc [The base patient class]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */

class Patient { 
 
    constructor(patientId, firstName, lastName, age, phoneNumber, emergPhoneNumber, address, bloodGroup, allergies, symptoms, diagnosis, treatment, followUp)
    {
        this.patientId = patientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.emergPhoneNumber = emergPhoneNumber;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies;
        this.symptoms = symptoms;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.followUp = followUp;
        return this;
    }
}
module.exports = Patient