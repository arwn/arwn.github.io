Setting Up Drawterm
===================

This document outlines how to set up 9front to be used with drawterm. Readers are not expected to have any Plan 9 experience. Basic Unix knowledge is helpful but not a requirement. At the end of this tutorial you will have the following:

*   a virtual machine (VM) runnning 9front
*   the ability to remotely connect to the VM using drawterm

This tutorial has been tested on Windows 10 and VirtualBox. Other operating systems and hypervisors may work. See [http://fqa.9front.org/](http://fqa.9front.org/) for more information.

_note: VirtualBox is not officially supported, but it works for now ;)_

Requirements
============

*   Microsoft Windows 10 \[[download](https://www.microsoft.com/en-us/software-download/windows10)\]
    *   Note that Linux and MacOS should work but havn’t been tested. The install procedure is identical unless noted.
*   VirtualBox \[[download](https://www.virtualbox.org/wiki/Downloads)\]
*   9front$version.amd64.iso \[[download](http://9front.org/iso/)\] (extract the gz)
*   drawterm.exe \[[download](http://drawterm.9front.org/)\]

Creating the VM
===============

1.  open VirtualBox
2.  click Machine>New…
3.  at the bottom, click Expert Mode
    *   Name and Operating System
        *   Name: Plan 9
        *   Machine Folder: _leave unchanged_
        *   Type: Other
        *   Version: Other/Unknown 64 bit
    *   Memory size
        *   1024 MB
    *   Hard disk
        *   Create a virtual hard disk now
4.  click Create
    *   File location
        *   _leave unchanged_
    *   File size
        *   12.00 GB
    *   Hard disk file type
        *   VDI (VirtualBox Disk Image)
    *   Storage on physical hard disk
        *   Dynamically allocated
5.  click Create

You should now have a new VM named ‘Plan 9’.

Adding a network device
-----------------------

In order to connect to the VM you need a Bridged network adapter. Click the newly created Plan 9 VM and navigate to Machine>Settings>Network. Adapter 1 should already be enabled and attached to NAT. Under Adapter 2 check Enable Network Adapter and attach it to Host-only Adapter.

When you boot your VM the NAT adapter will be used to connect to the internet. The bridged adapter will allow you to connect with drawterm over localhost.

Inserting the boot disk
-----------------------

Navigate to Machine>Settings>Storage. Add the 9front iso by

1.  under Storage Devices click the CD icon labled empty
2.  under Attributes click the other cd icon and select ‘Chose/Create a Virtual Optical Disk…’
3.  click Add
4.  select the 9front iso from your downloads
5.  click Choose
6.  click OK

Installing 9front
=================

_note: official install docs are located at [http://fqa.9front.org/fqa4.html](http://fqa.9front.org/fqa4.html)_

Start the Plan 9 virtal machine: Machine>Start>Normal Start. VirtualBox should now boot into the 9front install image.

At the bootargs, user, vgasize, and monitor prompts hit enter to select the defaults. In the Plan 9 console that appears, type ps2intellimouse and hit return. After a few seconds you should see the default 9front desktop with a resource monitor and a terminal open.

inst/start
----------

Most of the installation details will be skipped here for the sake of time. I highly suggest reading the [F.Q.A](http://fqa.9front.org/fqa4.html) if you have questions.

TL;DR: enter enter w q enter enter w q enter enter…

1.  In the terminal window, type `inst/start` to start the installer.
2.  configfs
    1.  hit `enter` to select cwfs64x
3.  partdisk
    1.  type `sdC0` to partition the VBOX HARDDISK
    2.  type `mbr`
    3.  type `w`
    4.  type `q`
4.  prepdisk
    1.  hit `enter` to partition /dev/sdC0/plan9
    2.  type `w`
    3.  type `q`
5.  mountfs
    1.  hit `enter` to select the default cache partition
    2.  hit `enter` to select the default worm partition
    3.  hit `enter` to select the default other partition
    4.  hit `enter` to ream the filesystem
6.  configdist
    1.  hit `enter` to select local
7.  confignet
    1.  hit `enter` to select automatic configuration
8.  mountdist
    1.  hit `enter` to select /
    2.  hit `enter` to select / again
9.  copydist
    1.  wait while the distribution files are coppied from the install media to the disk
        *   _note: this may take a few minutes_
10.  ndbsetup
    1.  hit `enter` to select the default sysname of cirno
11.  tzsetup
    1.  Type the name of your time zone (ex: US\_Pacific)
12.  bootsetup
    1.  hit `enter` to select the default fat partition
    2.  type `yes` to Plan 9 to the master boot record
    3.  type `yes` to mark the Plan 9 partition as active

Hit `enter` to finish the instalation. By default the virtual machine will reboot into the install disk again. Remove the install disk by powering off the machine, and in Machine>Settings>Storage select the 9front iso and click the red ‘x’ in the bottom.

Exploring the system
====================

The next step is to set up our new 9front instalation. Boot the VM and hit `enter` a few times until you reach the familiar grey desktop.

Now is a great time to check out the documentation on actually using 9front [http://fqa.9front.org/fqa8.html](http://fqa.9front.org/fqa8.html). To read the `intro(1)` manual page, type `man 1 intro` into the terminal.

Optional, but recommended manual pages:

*   `intro(1)`
*   `rio(1)`
*   `rc(1)`
*   `sam(1)`
*   `acme(1)`

Networking
==========

You should automagically have an internet connection on /net/ether0. Let’s set up our second network interface.

First we mount our network card:

    % bind -b '#l1' /net
    % ip/ipconfig ether /net/ether1
    

This should get us an IP address. Type `cat /net/ipselftab` and look for an address that looks like 192.168.56.xxx. This is the ip we will use to connect with in the next step.

_note: The IP address might be different on linux/macos._

Next we need to enable authentication and listen for connections.

    % auth/factotum -n
    % echo 'key proto=dp9ik dom=sol
        user=glenda !password=pass' > /mnt/factotum/ctl
    % aux/listen1 -t tcp!*!17019 /rc/bin/service/tcp17019
    

The aux/listen line should hang, this means we are ready to drawterm in.

Drawterm
========

In Windows, open up drawterm. Connect as follows

    cpu[cpu]: 192.168.56.xxx (the IP from earlier)
    auth[192.168.56.xxx]: <hit enter>
    user[glenda]: <hit enter>
    glenda@sol dp9ik password: pass
    

Tada, drawterm!

Further reading
---------------

[http://docs.a-b.xyz/cpu-setup.html](http://docs.a-b.xyz/cpu-setup.html)

[http://9.postnix.pw/ref/virtualbox](http://9.postnix.pw/ref/virtualbox)