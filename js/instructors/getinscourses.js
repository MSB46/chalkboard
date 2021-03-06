const getRelatedCourses = () => {

    let usertype = localStorage.getItem('user');
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getInsCourses/${usertype}`;

    //  Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer " + localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    fetch(API, requestOptions)
        .then(response => {
                if (response.status == 403)
                    return window.location.href = "../../index.html";

                return response.json()
            }
        )
        .then(courses => {

            console.log(courses);

            if (courses.error)
                return alert(courses.error);
            displayCourses(courses);


        })
        .catch(error => console.log('error', error));

}

window.onload = () => {
    getRelatedCourses();
}


const displayCourses = (courses) => {

    console.log(courses);
    let html = "";
    for (let key in courses) {
        html += `
    <div class="courses">
        <h2><span class="course-name">${courses[key].course_number}</span></h2>
        <h2>Instructor: ${courses[key].main_ins.name}</h2>
        <div class="options-courses">
          <a href="./iassignments.html" onclick="setID('${courses[key].courseId}', '${courses[key].course_number}')">See assignments</a>
          <button type="button" class="btn btn-primary add" data-toggle="modal" data-target="#modalCenter" onclick="setcoID('${courses[key].courseId}')"> Add Instructor</button>
          <button type="button" class="btn btn-primary rmv"  data-toggle="modal" data-target="#modalCenter2" onclick="setcoID('${courses[key].courseId}')"> Remove Instructor</button>
          <button type="button" class="btn btn-primary del" data-toggle="modal" data-target="#modalCenter3" onclick="setcoID('${courses[key].courseId}')"> Delete this course</button>
          <a href="./class-roster.html" onclick="setcoID('${courses[key].courseId}')">Check Roster</a>
        </div>
    </div>`;
    }

    document.querySelector('.course-container').innerHTML = html;

}

function setcoID(courseID) {
    localStorage.setItem('courseId', courseID);
}

function setID(id, cname) {

    localStorage.setItem('courseName', cname)
    localStorage.setItem('courseId', id);


}