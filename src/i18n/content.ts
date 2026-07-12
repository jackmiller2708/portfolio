import type { AuditFinding } from "@domain/audit";
import type { CaseStudy } from "@domain/case-study";
import type { LabPost } from "@domain/lab";
import type { Locale, SiteMeta } from "@domain/site";
import type { ServiceOffer } from "@domain/service";
import type { SystemMap } from "@domain/system-map";
import { localePath } from "./locales";

const serviceVi: Record<string, Partial<ServiceOffer>> = {
  "angular-system-audit": {
    title: "Audit hệ thống Angular",
    summary:
      "Một review Angular có phạm vi rõ để làm hiện rủi ro state, RxJS, data access, và error trước khi refactor lớn hơn.",
    clientPain:
      "Frontend Angular khó thay đổi và không ai chỉ ra được boundary rủi ro thật sự nằm ở đâu.",
    outputs: ["bản đồ rủi ro", "danh sách phát hiện", "roadmap ổn định hệ thống"],
    bestFit: [
      "đội sản phẩm Angular với hệ thống legacy hoặc sống lâu",
      "technical lead đang chuẩn bị refactor hoặc migration"
    ],
    notFit: ["trang marketing greenfield", "redesign giao diện một lần"],
    cta: {
      label: "Yêu cầu audit Angular",
      href: "/contact?service=angular-system-audit"
    }
  },
  "frontend-stabilization": {
    title: "Ổn định frontend",
    summary:
      "Hỗ trợ ổn định một workflow Angular rủi ro cao bằng mô hình state, data, và error rõ ràng.",
    clientPain: "Workflow quan trọng dễ vỡ và mỗi lần sửa lại tạo thêm regression mới.",
    outputs: ["kế hoạch refactor", "mô hình workflow có type", "boundary có thể test"],
    bestFit: [
      "đội Angular đang chịu áp lực delivery",
      "sản phẩm có core workflow dễ vỡ và regression tốn kém"
    ],
    notFit: ["redesign giao diện thuần túy", "ticket bug rời rạc không có ngữ cảnh hệ thống"],
    cta: {
      label: "Trao đổi ổn định hệ thống",
      href: "/contact?service=frontend-stabilization"
    }
  },
  "architecture-advisory": {
    title: "Tư vấn kiến trúc",
    summary:
      "Nhận input kiến trúc frontend Angular-first trước rewrite, migration, hoặc đợt feature lớn.",
    clientPain: "Đội cần một đường quyết định thực tế, không phải lời khuyên kiến trúc trừu tượng.",
    outputs: ["decision record", "bản đồ đánh đổi", "chuỗi triển khai"],
    bestFit: ["technical lead", "đội product engineering chuẩn bị quyết định frontend Angular lớn"],
    notFit: ["mentoring mở không có quyết định hệ thống cụ thể", "delivery feature commodity"],
    cta: {
      label: "Lên kế hoạch advisory",
      href: "/contact?service=architecture-advisory"
    }
  }
};

const findingVi: Record<string, Partial<AuditFinding>> = {
  "implicit-state": {
    title: "Ownership state bị ẩn qua các boundary feature",
    evidence:
      "State được chia sẻ qua component, service, và route effect mà không có owner rõ ràng.",
    risk: "Thay đổi nhỏ có thể tạo regression ẩn trong các màn hình không liên quan.",
    recommendation: "Đặt tên owner state trước khi refactor và pin các transition rủi ro cao.",
    area: "state"
  },
  "cache-semantics": {
    title: "Cache semantics chưa được tài liệu hóa",
    evidence: "Các màn hình dùng dữ liệu stale vì refresh timing và invalidation rule khác nhau.",
    risk: "Người dùng có thể thấy trạng thái mâu thuẫn sau mutation hoặc retry.",
    recommendation: "Viết rõ ownership, invalidation, và stale-data behavior trước cache helper.",
    area: "data access"
  },
  "unhandled-errors": {
    title: "Failure path không có recovery được đặt tên",
    evidence: "API error đi thẳng tới UI mà không qua trạng thái recoverable có type.",
    risk: "Người dùng gặp màn hình hỏng mà đội không có hành vi fallback để test.",
    recommendation: "Model lỗi theo recovery path và thêm test cho các failure quan trọng.",
    area: "errors"
  }
};

const labVi: Record<string, Partial<LabPost>> = {
  "cache-semantics": {
    title: "Cache semantics trước cache helper",
    summary:
      "Ghi chú về việc định nghĩa ownership, invalidation, và stale data trước khi thêm cache utility.",
    takeaway: "Cache helper an toàn hơn khi cache semantics được tài liệu hóa trước."
  },
  "data-error-modeling": {
    title: "Model data và error cho workflow Angular",
    summary: "Ghi chú về cách biểu diễn loading, success, empty, và failure state rõ ràng.",
    takeaway: "Typed data state giữ UI dễ dự đoán hơn khi API fail bình thường."
  },
  "hash-equal": {
    title: "Hash/Equal và identity trong frontend state",
    summary: "Ghi chú về equality, lookup sharing, và cache behavior trong TypeScript.",
    takeaway: "Identity rõ ràng giúp cache và lookup behavior ít phụ thuộc vào may mắn."
  },
  "rxjs-cleanup": {
    title: "Dọn RxJS mà không giấu ownership",
    summary: "Ghi chú về việc làm pipeline dễ đọc hơn mà không mất thông tin owner.",
    takeaway: "RxJS sạch hơn khi stream ownership được đặt tên trước khi gom logic."
  }
};

const caseVi: Record<string, Partial<CaseStudy>> = {
  "admin-refactor": {
    title: "Refactor boundary cho admin feature",
    summary:
      "Một ca đã ẩn danh về việc tách UI shell, data access, và domain rule để giảm rủi ro review.",
    context: "Admin area trong một frontend Angular dài hạn có nhiều rule và data dependency.",
    problem:
      "UI component, data access, và domain rule bị coupling chặt, khiến thay đổi admin nhỏ cũng rủi ro và khó review.",
    constraints: [
      "Không được rewrite toàn bộ feature.",
      "Phải giữ delivery đang chạy.",
      "Không được lộ chi tiết operational riêng tư."
    ],
    decisions: [
      {
        title: "Tách feature shell khỏi data access",
        rationale:
          "Feature shell giữ behavior người dùng; data service giữ request và normalization."
      },
      {
        title: "Ghi decision note cho boundary",
        rationale: "Đội cần biết rule nào được chuyển và rule nào vẫn giữ tạm thời."
      }
    ],
    tradeoffs: [
      "Thay đổi theo sequence chậm hơn rewrite nhưng giảm rủi ro regression.",
      "Một vài rule cũ vẫn tồn tại cho đến sprint tiếp theo."
    ],
    beforeAfter: {
      before: ["Component gọi API trực tiếp.", "Rule bị lặp trong nhiều màn hình."],
      after: ["Feature shell có owner rõ.", "Data access được gom sau boundary có tên."]
    },
    evidence: [
      { label: "Boundary", detail: "Review path rõ hơn vì data access không nằm lẫn trong UI." },
      { label: "Change risk", detail: "Thay đổi sau đó có phạm vi nhỏ hơn và dễ kiểm tra hơn." }
    ],
    result:
      "Admin area có ownership boundary rõ hơn và review path an toàn hơn cho các thay đổi sau.",
    recommendation: "Bắt đầu bằng audit boundary trước khi gom service hoặc rewrite màn hình."
  },
  "checkout-stabilization": {
    title: "Ổn định checkout flow",
    summary:
      "Một ca đã ẩn danh về việc model request state và recovery path để checkout dễ hiểu hơn.",
    context: "Checkout flow Angular có nhiều eligibility check, retry, và partial failure.",
    problem:
      "Checkout screen phản ứng với state chia sẻ lỏng lẻo, nên retry, partial failure, và eligibility change tạo đường đi người dùng không nhất quán.",
    constraints: [
      "Không được chặn release đang chạy.",
      "Không được thay đổi payment integration ngoài phạm vi frontend.",
      "Cần giữ trải nghiệm người dùng ổn định trong quá trình refactor."
    ],
    decisions: [
      {
        title: "Model checkout thành các request state rõ ràng",
        rationale:
          "UI cần biết đang loading, success, failure, hay retry thay vì đoán từ flag rời rạc."
      },
      {
        title: "Đặt tên recovery path",
        rationale: "Mỗi failure quan trọng cần một fallback có thể test và có thể giải thích."
      }
    ],
    tradeoffs: [
      "Thêm model type ban đầu nhưng giảm điều kiện UI rải rác.",
      "Một vài fallback được giữ conservative để tránh thay đổi behavior quá rộng."
    ],
    beforeAfter: {
      before: [
        "Flag checkout bị chia sẻ qua nhiều component.",
        "Error handling phụ thuộc nhánh UI."
      ],
      after: ["Request state được đặt tên.", "Recovery path được pin bằng test quan trọng."]
    },
    evidence: [
      { label: "State model", detail: "Checkout state trở thành input rõ ràng cho rendering." },
      { label: "Recovery", detail: "Retry và partial failure có behavior được đặt tên." }
    ],
    result:
      "Checkout flow dễ reason hơn, với ít dependency ẩn giữa payment state, eligibility check, và UI recovery.",
    recommendation: "Model request state trước khi cố sửa từng bug checkout riêng lẻ."
  }
};

export const localizeHref = (locale: Locale, href: string): string => {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
    return href;
  }

  const [path, hash] = href.split("#");
  const localized = localePath(locale, path || "/");

  return hash ? `${localized}#${hash}` : localized;
};

export const localizeSiteMeta = (site: SiteMeta, locale: Locale): SiteMeta => {
  if (locale === "en") {
    return site;
  }

  return {
    ...site,
    title: "Nguyễn Ngọc Huy / Jack Miller",
    description:
      "Angular Frontend Systems Engineer tại Việt Nam cho audit, refactor, và ổn định hệ thống.",
    availability:
      "Nhận contractor part-time có chọn lọc cho audit Angular, sprint refactor, và advisory kiến trúc.",
    credibilityPoints: [
      {
        label: "Định danh",
        value: "Nguyễn Ngọc Huy / Jack",
        detail: "Angular Frontend Systems Engineer tại Việt Nam."
      },
      {
        label: "Stack",
        value: "Angular · RxJS · TypeScript",
        detail: "Kiến trúc frontend, kế hoạch refactor, và data flow."
      },
      {
        label: "Hợp tác",
        value: "Tiếng Việt / English",
        detail: "Remote async-friendly với boundary contractor rõ ràng."
      }
    ],
    nonFitCriteria: [
      "Ticket giá rẻ hoặc việc UI-only rời rạc không có ngữ cảnh hệ thống frontend.",
      "Trang marketing greenfield không có rủi ro kiến trúc hoặc maintainability Angular.",
      "Staff augmentation mở không có outcome audit, refactor, hoặc advisory rõ ràng."
    ],
    about: {
      context:
        "Tôi là Nguyễn Ngọc Huy, Angular Frontend Systems Engineer tại Việt Nam. Các đội nói tiếng Anh có thể gọi tôi là Jack.",
      philosophy:
        "Tôi làm hệ thống frontend Angular dễ reason hơn bằng cách làm rõ ownership của state, RxJS flow, service boundary, data access, và error handling. Phần lớn vấn đề frontend không phải vấn đề framework; đó là vấn đề boundary.",
      workingStyle: [
        "Bắt đầu bằng một audit Angular có phạm vi rõ khi bước tiếp theo chưa chắc chắn.",
        "Ưu tiên boundary rõ, contract có type, và migration thực tế hơn rewrite lớn.",
        "Làm việc theo feedback loop ngắn với engineering lead, constraint sản phẩm, timeline, budget, và năng lực đội."
      ],
      qualityPhilosophy: [
        "Kinh nghiệm production mạnh nhất của tôi là Angular 12-18, hệ thống nhiều RxJS, kiến trúc TypeScript, model data/error rõ ràng, và kế hoạch refactor frontend.",
        "Tôi làm tốt nhất khi phần khó không chỉ là màn hình, mà là hệ thống quanh màn hình: state ownership, data loading, cancellation, error handling, caching, equality, và component boundary.",
        "Tôi cũng đã làm với React và Next.js, nhưng positioning contractor của tôi chủ ý Angular-first."
      ],
      communication:
        "Tôi ở Việt Nam và làm việc thoải mái với đội nói tiếng Việt hoặc tiếng Anh. Với khách hàng nói tiếng Anh, gọi tôi là Jack là được."
    }
  };
};

export const localizeServices = (services: readonly ServiceOffer[], locale: Locale) =>
  services.map((service) => {
    const translation = locale === "vi" ? serviceVi[service.id] : undefined;
    const localized = { ...service, ...translation };

    return {
      ...localized,
      cta: {
        ...localized.cta,
        href: localizeHref(locale, localized.cta.href)
      }
    } satisfies ServiceOffer;
  });

export const localizeFindings = (findings: readonly AuditFinding[], locale: Locale) =>
  findings.map((finding) => ({
    ...finding,
    ...(locale === "vi" ? findingVi[finding.id] : undefined)
  }));

export const localizeLabPosts = (posts: readonly LabPost[], locale: Locale) =>
  posts.map((post) => ({ ...post, ...(locale === "vi" ? labVi[post.id] : undefined) }));

export const localizeCaseStudies = (caseStudies: readonly CaseStudy[], locale: Locale) =>
  caseStudies.map((caseStudy) => ({
    ...caseStudy,
    ...(locale === "vi" ? caseVi[caseStudy.id] : undefined)
  }));

export const localizeSystemMap = (map: SystemMap, locale: Locale): SystemMap => {
  if (locale === "en") {
    return map;
  }

  return {
    ...map,
    title: "Bản đồ boundary hệ thống frontend",
    summary:
      "Bản đồ cho thấy ownership frontend lộn xộn trở nên rõ ràng qua boundary feature, data, error, và testing.",
    fallbackLabel:
      "Bản đồ frontend system tĩnh với các node UI shell, feature boundary, data access, error model, tests, và delivery roadmap.",
    groups: [
      { id: "interface", label: "Giao diện" },
      { id: "boundary", label: "Boundary" },
      { id: "delivery", label: "Delivery" }
    ],
    nodes: [
      {
        id: "ui-shell",
        label: "UI shell",
        group: "interface",
        description: "Route, layout, và composition màn hình."
      },
      {
        id: "feature-boundary",
        label: "Feature boundary",
        group: "boundary",
        description: "Ownership cho feature state và behavior người dùng."
      },
      {
        id: "data-access",
        label: "Data access",
        group: "boundary",
        description: "Request, normalization, cache, và mutation behavior."
      },
      {
        id: "error-model",
        label: "Error model",
        group: "boundary",
        description: "Failure state và recovery path được đặt tên."
      },
      {
        id: "tests",
        label: "Tests",
        group: "delivery",
        description: "Check cho behavior rủi ro và public route."
      },
      {
        id: "roadmap",
        label: "Delivery roadmap",
        group: "delivery",
        description: "Chuỗi ổn định và refactor có thứ tự."
      }
    ],
    riskMarkers: [
      { nodeId: "feature-boundary", label: "Ownership ẩn tạo regression." },
      { nodeId: "data-access", label: "Cache rule không rõ tạo UI stale." }
    ],
    decisionMarkers: [
      { nodeId: "error-model", label: "Đặt tên lỗi theo recovery path." },
      { nodeId: "roadmap", label: "Sắp xếp theo rủi ro hệ thống nhìn thấy được." }
    ],
    states: {
      messy: "State, data, error, và test bị coupling qua behavior component.",
      explicit: "Feature ownership, data access, error state, và check được đặt tên và sắp xếp."
    }
  };
};
