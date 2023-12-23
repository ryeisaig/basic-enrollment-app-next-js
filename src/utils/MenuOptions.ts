import { AccountCircleOutlined, AddLinkOutlined, AddTaskOutlined, ArrowDropDown, ArticleOutlined, AssessmentOutlined, AssignmentOutlined, AttachFileOutlined, AttachmentOutlined, BarChart, BorderColorOutlined, BubbleChart, BusinessOutlined, CancelPresentationOutlined, CastForEducationOutlined, CastOutlined, ComputerOutlined, DateRangeOutlined, DeleteForever, Diversity1Outlined, Diversity3Outlined, EngineeringOutlined, GradingOutlined, GridViewOutlined, GridViewRounded, GridViewSharp, Groups3Outlined, HelpOutline, HistoryEduOutlined, HistoryOutlined, InterestsOutlined, KeyOutlined, ListAltOutlined, LocalLibrary, LocalLibraryOutlined, LockOpenOutlined, LogoutOutlined, ManageAccountsOutlined, ManageSearchOutlined, MarkEmailReadOutlined, MeetingRoomOutlined, NavigateNextOutlined, NoteAddOutlined, NotificationsOutlined, PersonAddAlt1, PersonAddAlt1Outlined, PlaylistAdd, PlaylistAddCheckOutlined, PlaylistAddOutlined, PostAddOutlined, PsychologyOutlined, ReceiptLongOutlined, RestoreFromTrash, SettingsOutlined, SpellcheckOutlined, SupportAgentOutlined, WorkOutline } from '@mui/icons-material';

export const menuOptions = [
    {
      title: "dashboard", icon: GridViewOutlined, options: [
        { title: 'enrollmentDashboard', icon: BubbleChart, permissionKey: "enrollments.read", path: "dashboard/enrollment" },
        { title: 'gradingDashboard', icon: BarChart, permissionKey: "grades.read", path: "dashboard/grading" },
      ]
    },
    {
      title: 'enrollment', icon: AddTaskOutlined, options:
        [
          { title: 'enrollNew', icon: PersonAddAlt1Outlined, permissionKey: "enrollments.create" },
          { title: 'enrollExisting', icon: PersonAddAlt1, permissionKey: "enrollments.create" },
          { title: 'enrollments', icon: AttachmentOutlined, permissionKey: "enrollments.read" },
          { title: 'admissionRequests', icon: NoteAddOutlined, permissionKey: "admissions.read" },
          { title: 'preregistrationRequests', icon: AddLinkOutlined, permissionKey: "preregistrations.read" },
          { title: 'addSubject', icon: PostAddOutlined, permissionKey: "enrollments.update" },
          { title: 'changeSubject', icon: BorderColorOutlined, permissionKey: "enrollments.update" },
          { title: 'dropSubject', icon: CancelPresentationOutlined, permissionKey: "enrollments.update" },
          { title: 'creditEvaluation', icon: GradingOutlined, permissionKey: "credit-evaluations.read" }
        ]
    },
    {
      title: 'administrative', icon: WorkOutline, options:
        [
          { title: 'requests', icon: MarkEmailReadOutlined, permissionKey: "*" },
          { title: 'classes', icon: CastForEducationOutlined, permissionKey: "classes.read" },
          { title: 'students', icon: Diversity3Outlined, permissionKey: "students.read" },
          { title: 'grades', icon: SpellcheckOutlined, permissionKey: "grades.read" },
          { title: 'sections', icon: Groups3Outlined, permissionKey: "sections.read" },
          { title: 'subjects', icon: InterestsOutlined, permissionKey: "subjects.read" },
          { title: 'teachers', icon: LocalLibraryOutlined, permissionKey: "instructors.read" },
          { title: 'courses', icon: EngineeringOutlined, permissionKey: "students.read" },
          { title: 'colleges', icon: BusinessOutlined, permissionKey: "colleges.read" },
          { title: 'rooms', icon: MeetingRoomOutlined, permissionKey: "rooms.read" },
          { title: 'forms', icon: ArticleOutlined, permissionKey: "rooms.read" },
        ]
    },
    {
      title: 'system', icon: ComputerOutlined, options:
        [
          { title: 'users', icon: ManageAccountsOutlined, permissionKey: "users.read" },
          { title: 'roles', icon: KeyOutlined, permissionKey: "roles.read" },
          { title: 'academicPeriod', icon: DateRangeOutlined, permissionKey: "academicPeriod.read" },
          { title: 'lookups', icon: ManageSearchOutlined, permissionKey: "lookups.read"  },
          { title: 'settings', icon: SettingsOutlined, permissionKey: "settings.read"  },
          { title: 'auditTrail', icon: HistoryOutlined, permissionKey: "audit-trail.read"  },
          { title: 'trashBin', icon: RestoreFromTrash, permissionKey: "trash-bin.read"  },
          { title: 'help', icon: HelpOutline, permissionKey: "*" },
          { title: 'ticket', icon: SupportAgentOutlined }
        ]
    },
    {
      title: 'reports', icon: AssessmentOutlined, options:
        [
          { title: 'enrollmentList', icon: ListAltOutlined, permissionKey: "reports.read" },
          { title: 'promotionalReport', icon: ReceiptLongOutlined, permissionKey: "reports.read" },
          { title: 'transcriptOfRecords', icon: HistoryEduOutlined, permissionKey: "reports.read" }
        ]
    },
    // {
    //   title: 'forms', icon: ArticleOutlined, options:
    //     [
    //       { title: 'manageForms', icon: ArticleOutlined, permissionKey: "forms.create" },
    //       { title: 'admissionForm', icon: ArticleOutlined, permissionKey: "forms.read" },
    //       { title: 'preregistrationForm', icon: ArticleOutlined, permissionKey: "forms.read" }
    //     ]
    // }
  ];

  export const settings = [
    { title: 'notifications', icon: NotificationsOutlined },
    { title: 'account', icon: AccountCircleOutlined},
    { title: 'preferences', icon: PsychologyOutlined },
    { title: 'changePassword', icon: LockOpenOutlined },
    { title: 'logout', icon: LogoutOutlined }
  ];