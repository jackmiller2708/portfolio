import type { Locale } from "@domain/site";

export const defaultLocale: Locale = "en";
export const locales = ["en", "vi"] as const satisfies readonly Locale[];

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt"
};

export const localePath = (locale: Locale, path: string): string => {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

export const alternateLocale = (locale: Locale): Locale => (locale === "en" ? "vi" : "en");

export const ui = {
  en: {
    nav: {
      services: "Services",
      caseStudies: "Case Studies",
      lab: "Lab",
      sampleAudit: "Sample Audit",
      about: "About",
      contact: "Contact"
    },
    header: {
      switchTheme: "Switch theme",
      openNav: "Open navigation",
      closeNav: "Close navigation",
      language: "Tiếng Việt"
    },
    home: {
      primaryCta: "Request an audit",
      secondaryCta: "See past work",
      support:
        "My first job is to make the risk visible: where state lives, how data moves, where errors disappear, and which next step is worth taking.",
      diagnosticTitle: "Start where the Angular system is already resisting change",
      diagnosticSummary:
        "Pick the pain closest to your current risk. The path below updates with the matching service, audit finding, and map state.",
      diagnosticOptionsLabel: "Frontend system pains",
      recommendedPath: "Recommended path",
      service: "Service",
      referenceFinding: "Reference finding",
      mapState: "Map state",
      pastWorkTitle: "Past work without private details",
      pastWorkSummary:
        "Each case study keeps the engineering shape visible while removing client-specific names, paths, and production data.",
      problem: "Problem",
      decision: "Decision",
      result: "Result",
      systemMapTitle: "The Angular architecture in context",
      systemMapSummary:
        "The map turns messy frontend ownership into named boundaries for state, data access, and recovery paths.",
      labTitle: "Notes from the work",
      labSummary:
        "Short technical entries about decisions that are easy to miss until a system starts failing around them.",
      openLab: "Open lab",
      moreInLab: "More in the lab"
    },
    common: {
      viewServices: "View services",
      requestAudit: "Request an audit",
      readCaseStudy: "Read case study",
      readNote: "Read note",
      backToCases: "Back to cases",
      backToLab: "Back to lab",
      recommendedNextReads: "Recommended next reads",
      relatedServices: "Related services",
      takeaway: "Takeaway",
      codeLanguage: "Code language"
    },
    services: {
      usefulTitle: "Where this work is useful",
      usefulSummary:
        "Use these criteria to check whether an Angular audit, advisory pass, or implementation sprint is a good first move.",
      boundaryTitle: "Boundaries that keep scope useful",
      boundarySummary:
        "These exclusions reduce mismatched requests and keep the work tied to Angular system clarity, maintainability, and frontend risk.",
      siteExclusions: "Site-level exclusions"
    },
    about: {
      shortVersion: "Short version",
      name: "Name",
      alsoCalled: "Also called",
      alsoCalledValue: "Jack by English-speaking teams",
      role: "Role",
      roleValue: "Angular Frontend Systems Engineer",
      location: "Location",
      locationValue: "Vietnam",
      email: "Email",
      protects: "What I protect in frontend systems",
      workOn: "What I work on",
      howIWork: "How I work",
      willNotDo: "What I will not do",
      communication: "Communication",
      emailLine: "For Angular audit, refactor, or architecture inquiries, email me at"
    },
    contact: {
      seoDescription: "Request an Angular frontend audit with Nguyen Ngoc Huy / Jack.",
      beforeSending: "Before sending",
      fitNote: "These requests are usually not a fit for my Angular contractor work."
    },
    cases: {
      viewSampleAudit: "View sample audit",
      context: "Context",
      caseScan: "Case scan",
      constraints: "Constraints",
      decisions: "Decisions",
      tradeoffs: "Tradeoffs",
      beforeAfter: "Before and after architecture",
      before: "Before",
      after: "After",
      evidence: "Evidence",
      recommendation: "Recommendation"
    },
    audit: {
      primaryCta: "Request similar diagnostic",
      guidedTitle: "Guided audit walkthrough",
      guidedSummary:
        "Step through one finding as symptom, evidence, risk, recommendation, and sprint sequence.",
      findingsLabel: "Audit findings",
      phaseLabel: "Walkthrough phase",
      symptom: "Symptom",
      evidence: "Evidence",
      risk: "Risk",
      recommendation: "Recommendation",
      sprint: "Sprint sequence",
      talk: "Talk through an audit",
      readFull: "Read the full walkthrough",
      fullReportTitle: "Full report view",
      fullReportSummary:
        "Scan all findings, severity groups, and the sprint sequence without using the guide.",
      findings: "findings",
      sprintRoadmap: "Sprint roadmap"
    }
  },
  vi: {
    nav: {
      services: "Dịch vụ",
      caseStudies: "Ca thực tế",
      lab: "Lab",
      sampleAudit: "Mẫu audit",
      about: "Giới thiệu",
      contact: "Liên hệ"
    },
    header: {
      switchTheme: "Đổi giao diện",
      openNav: "Mở điều hướng",
      closeNav: "Đóng điều hướng",
      language: "English"
    },
    home: {
      primaryCta: "Yêu cầu audit",
      secondaryCta: "Xem công việc",
      support:
        "Việc đầu tiên của tôi là làm rủi ro hiện rõ: state nằm ở đâu, dữ liệu đi như thế nào, lỗi biến mất ở đâu, và bước tiếp theo nào đáng làm.",
      diagnosticTitle: "Bắt đầu từ nơi hệ thống Angular đang khó thay đổi",
      diagnosticSummary:
        "Chọn vấn đề gần nhất với rủi ro hiện tại. Lộ trình bên dưới sẽ cập nhật theo dịch vụ, phát hiện audit, và trạng thái bản đồ phù hợp.",
      diagnosticOptionsLabel: "Các điểm đau của hệ thống frontend",
      recommendedPath: "Lộ trình đề xuất",
      service: "Dịch vụ",
      referenceFinding: "Phát hiện tham chiếu",
      mapState: "Trạng thái bản đồ",
      pastWorkTitle: "Công việc cũ không lộ chi tiết riêng tư",
      pastWorkSummary:
        "Mỗi ca thực tế giữ lại hình dạng kỹ thuật nhưng loại bỏ tên khách hàng, đường dẫn, và dữ liệu production.",
      problem: "Vấn đề",
      decision: "Quyết định",
      result: "Kết quả",
      systemMapTitle: "Kiến trúc Angular trong ngữ cảnh",
      systemMapSummary:
        "Bản đồ biến ownership frontend lộn xộn thành boundary được đặt tên cho state, data access, và recovery path.",
      labTitle: "Ghi chú từ công việc",
      labSummary:
        "Các ghi chú kỹ thuật ngắn về những quyết định dễ bị bỏ qua cho đến khi hệ thống bắt đầu hỏng quanh chúng.",
      openLab: "Mở lab",
      moreInLab: "Xem thêm trong lab"
    },
    common: {
      viewServices: "Xem dịch vụ",
      requestAudit: "Yêu cầu audit",
      readCaseStudy: "Đọc ca thực tế",
      readNote: "Đọc ghi chú",
      backToCases: "Về danh sách ca",
      backToLab: "Về lab",
      recommendedNextReads: "Nên đọc tiếp",
      relatedServices: "Dịch vụ liên quan",
      takeaway: "Điểm chính",
      codeLanguage: "Ngôn ngữ code"
    },
    services: {
      usefulTitle: "Khi nào công việc này hữu ích",
      usefulSummary:
        "Dùng các tiêu chí này để kiểm tra audit Angular, advisory, hoặc implementation sprint có phải bước đầu tốt không.",
      boundaryTitle: "Boundary giúp scope hữu ích",
      boundarySummary:
        "Các loại trừ này giảm request lệch scope và giữ công việc gắn với clarity, maintainability, và frontend risk của hệ thống Angular.",
      siteExclusions: "Loại trừ cấp site"
    },
    about: {
      shortVersion: "Tóm tắt",
      name: "Tên",
      alsoCalled: "Tên gọi khác",
      alsoCalledValue: "Jack cho các đội nói tiếng Anh",
      role: "Vai trò",
      roleValue: "Angular Frontend Systems Engineer",
      location: "Vị trí",
      locationValue: "Việt Nam",
      email: "Email",
      protects: "Điều tôi bảo vệ trong frontend system",
      workOn: "Tôi làm gì",
      howIWork: "Cách tôi làm việc",
      willNotDo: "Việc tôi không phù hợp",
      communication: "Giao tiếp",
      emailLine: "Với yêu cầu audit, refactor, hoặc kiến trúc Angular, email cho tôi tại"
    },
    contact: {
      seoDescription: "Yêu cầu audit frontend Angular với Nguyen Ngoc Huy / Jack.",
      beforeSending: "Trước khi gửi",
      fitNote: "Các yêu cầu này thường không phù hợp với phạm vi contractor Angular của tôi."
    },
    cases: {
      viewSampleAudit: "Xem mẫu audit",
      context: "Ngữ cảnh",
      caseScan: "Tóm tắt ca",
      constraints: "Ràng buộc",
      decisions: "Quyết định",
      tradeoffs: "Đánh đổi",
      beforeAfter: "Kiến trúc trước và sau",
      before: "Trước",
      after: "Sau",
      evidence: "Dấu hiệu",
      recommendation: "Đề xuất"
    },
    audit: {
      primaryCta: "Yêu cầu audit tương tự",
      guidedTitle: "Walkthrough audit có hướng dẫn",
      guidedSummary:
        "Đi qua một phát hiện theo triệu chứng, dấu hiệu, rủi ro, đề xuất, và chuỗi sprint.",
      findingsLabel: "Các phát hiện audit",
      phaseLabel: "Giai đoạn walkthrough",
      symptom: "Triệu chứng",
      evidence: "Dấu hiệu",
      risk: "Rủi ro",
      recommendation: "Đề xuất",
      sprint: "Chuỗi sprint",
      talk: "Trao đổi về audit",
      readFull: "Đọc walkthrough đầy đủ",
      fullReportTitle: "Xem báo cáo đầy đủ",
      fullReportSummary:
        "Xem toàn bộ phát hiện, nhóm severity, và chuỗi sprint mà không cần dùng guide.",
      findings: "phát hiện",
      sprintRoadmap: "Roadmap sprint"
    }
  }
} as const;

export const t = (locale: Locale) => ui[locale];
