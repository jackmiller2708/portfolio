---
title: RxJS cleanup without hiding ownership
summary: A short note on making stream ownership and teardown visible.
topic: RxJS
takeaway: Stream cleanup should clarify ownership instead of scattering unsubscribe mechanics.
---

RxJS cleanup is most useful when it also makes ownership boundaries obvious.
