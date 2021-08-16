---
id: "change_url"
title: "Changing the url"
sidebar_label: "Changing the url"
---

Cosmos-ify the adding of certs
1. create (in prd galaxy) if id = prd public hosted zone for cafe.devops
2. before certificates, do cross account zone delegation (see solar system core stack for example)
3. then nce that's done, do the same thing for domainName, add * for alternative names. that will then handle the rest, create record and validate it
4. then in customer labds example, they took ext appraoch. create a record in hosted zone, then 
    - fromAlias(new LoadBlanacerTarget(alb)) 
    - need a listener rule, additional host header