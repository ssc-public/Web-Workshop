# Ansible


<p align=center>

![Ansible](https://cdn.freebiesupply.com/logos/large/2x/ansible-logo-png-transparent.png)

</p>

<p align='center'>
 عرشیا اخوان،بهار خدابخشیان و محمدرضا عبدی

</p>

# What is Ansible?
<p dir="rtl" style="position:right;">
Ansible یک ابزار برای automate  کردن فرایند های تکراری است.
</p>
<p dir="rtl" style="position:right;">
از جمله کاربرد‌های آن می‌توان به cloud provisioning, configuration management, application deployment و ... اشاره کرد.
</p>
<p dir="rtl" style="position:right;">
انسیبل یک configuration as a code است که با استفاده از آن می‌توان state نهایی را توصیف کرد(declerative approuch).
Ansible برای دسترسی به machine های مقصد از SSH استفاده می‌کند و برای این کار نیاز به هیچ agent ای در machine های مقصد ندارد.
</p>

# install


# Ansible components
<p dir="rtl" style="position:right;">
تمام component های انسیبل که در execution fellow وجود دارند به صورت یک oonfiguration file و به صورت یک فایل yaml نوشته می‌شوند

### execution fellow

<p dir="rtl" style="position:right;">
هر انسیبل از یک playbook تشکیل شده است که می‌تواند شامل یک یا چند Play باشد. 
هر Play نیز از تعدادی task تشکیل شده است که هر کدام از این task ها وظیفه اجرای یک ماژول را به همراه پارامتر های ست شده دارند.

### Ansible hosts
<p dir="rtl" style="position:right;">
در این فایل آدرس ماشین‌های مقصد و متغیر‌های اختصاصی آن را مشخص می‌کنیم.
همچنین در این فایل می‌توانیم  ماشین های مقصد را بر اساس کاربرد آن ها گروه بندی کنیم.
مثالی از یک فایل ansible hosts:

```toml
[k8s]
1.2.3.4     name: "k8s-worker-node-1"
1.2.3.5     name: "k8s-worker-node-2"
1.2.3.6     name: "k8s-master-node-1"

[mongo]
10.0.0.[1:3]

[all:vars]
ansible_connection=ssh
ansible_user=myUser
ansible_ssh_port=22
```
<p dir="rtl" style="position:right;">
 به صورت عادی این فایل در آدرس زیر قرار دارد ولی می‌توان با flag -i از آدرس دلخواه خود استفاده کنید. 

```/etc/ansible/hosts```

### Task & modules
<p dir="rtl" style="position:right;">
task ها واحد های عملیاتی یک ansible playbook به شمار  می‌آیند و هرکدام نحوه‌ی اجرای یک ماژول بر روی ماشین های مقصد را توصیف می‌کند.
<p dir="rtl" style="position:right;">
module ها قطعه کد هایی هستند که ماشین را از حالت اولیه به حالت هدف می‌رسانند.
دقت کنید که انسیبل توصیفی (declerative) می‌باشد و ما نحوه‌ی رسیدن به حالت نهایی را تعیین نمی‌کنیم بلکه تنها حالت نهایی را تعریف کرده و انتخاب مسیر مناسب بر عهده‌ی ماژول مورد استفاده می‌باشد.

<p dir="rtl" style="position:right;">
مثالی از یک تسک که تضمین می‌کند java 1.8 بر روی سیستم نصب شده باشد.

```yaml
- name: .:(RHEL):. installing java-jre version 1.8.0
  yum:
    name: java-1.8.0-openjdk
    state: installed
```

### Play & Playbook
<p dir="rtl" style="position:right;">
همان‌گونه که در بالا اشاره شد هر playbook از یک یا چند play تشکیل شده است.
در واقع play را می‌توان مجموعه کامل از عملیات مورد نیاز(task) برای رسیدن به state نهایی در نظر گرفت.
در هر play پارامتر های مورد نیاز برای اجرای ansible (مانند machine های مقصد، تعداد ماشین هایی که ansible  به صورت همزمان روی آن‌ها اجرا می‌شود ، ...) را مشخص می‌کنیم

<p dir="rtl" style="position:right;">
مثالی از یک playbook که یک دیسک جدید را به سیستم اضافه می‌کند:

```yaml
---
# playbook

# first play
- name: disk setup
  hosts: all
  tasks:
  # first task
  - name: Create filesystem on disk
    # first module
    filesystem:
      fstype: 'ext4'
      dev: '/dev/sdb'

  - name: mounting the disk
    mount:
      path: '/mnt/'
      src: '/dev/sdb'
      fstype: 'ext4'
      state: mounted

  - name: configuring the ownership
    file:
      path: '/mnt/'
      state: directory
      owner: root
      group: root
      mode: '0644'

```