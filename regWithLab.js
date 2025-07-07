//Hide teachers with zero seats left - in registration with lab

//Placeholder data for testing
// const subjects = {
//     "BCSE208L-Data Mining": {
//         "teacher": {
//             "SUBRAMANIYASWAMY V": {
//                 "slots": "F1+L43+L44",
//                 "venue": "SJT508",
//                 "color": "rgb(214, 255, 214)"
//             },
//             "BALAMURUGAN R": {
//                 "slots": "F1+L31+L32",
//                 "venue": "SJT702",
//                 "color": "rgb(214, 255, 214)"
//             },
//             "CHELLATAMILAN T (E)": {
//                 "slots": "F2+L11+L12",
//                 "venue": "SJT508",
//                 "color": "rgb(214, 255, 214)"
//             },
//             "DHEEBA J": {
//                 "slots": "F1+L45+L46",
//                 "venue": "SJT513",
//                 "color": "rgb(255, 205, 205)"
//             }
//         },
//         "credits": 2
//     },
//     "BCSE102L-Structured and Object‐Oriented Programming": {
//         "teacher": {},
//         "credits": 0
//     }
// }


//Retrive the stored timetable and modify the page;
chrome.storage.local.get("timeTable", (ttData) => {
    if (ttData.timeTable) {
        const subjects = ttData.timeTable.subject;

        //Modifying Page
        const courseCodeAndNameArray = document.querySelector("div.table-responsive").getElementsByTagName("tr")[1].getElementsByTagName("span")[0].textContent.split(" - ");
        const courseCodeAndName = courseCodeAndNameArray[0] + "-" + courseCodeAndNameArray[1];
        const teachersList = subjects[courseCodeAndName]['teacher'];

        const elements = document.querySelectorAll("#clashSlots1, #clashSlots2");
        for (element of elements) {
            let tableRow = element.parentElement;
            //Hiding the element if seats are Full
            if (element.parentElement.getElementsByTagName("span")[0].textContent == '0')  //Set to 'Full' for hiding; 0 for testing
            {
                element.parentElement.style.display = "none";
            }
            //Colour coding the table rows as provided by the user
            else {
                //Morning theory check
                if (teachersList[tableRow.getElementsByTagName("td")[2].textContent]) {
                    tableRow.style.backgroundColor = teachersList[tableRow.getElementsByTagName("td")[2].textContent]['color'];
                }
                //Evening theory check
                else if (teachersList[tableRow.getElementsByTagName("td")[2].textContent + ' (E)']) {
                    tableRow.style.backgroundColor = teachersList[tableRow.getElementsByTagName("td")[2].textContent + ' (E)']['color'];
                }
                //Grey-out if not part of list
                else {
                    tableRow.style.backgroundColor = 'grey';
                }
            }
        }
    }
});

//Auto click the regular course option
document.getElementById("CourseOption").click()