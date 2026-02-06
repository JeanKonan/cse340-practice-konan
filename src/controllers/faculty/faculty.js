import { getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const faculty = getSortedFaculty(sortBy);
    res.render('faculty/list', { 
        faculty,
        sortBy,
        title: 'Faculty Directory'
    });
};

const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', { 
        faculty: facultyMember,
        title: `${facultyMember.name} - ${facultyMember.title}`
    });
};

export { facultyListPage, facultyDetailPage };