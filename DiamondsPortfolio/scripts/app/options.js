var mainOptions = {
	diamondPoints: [150, 90, 260, 50, 420, 50, 530, 90, 630, 210, 340, 650, 50, 210],
	fillPatternOffset: [-50, -50],
    colorIDs : {
        red: 'red',
        green: 'green',
        blue: 'blue',
        orange: 'orange',
        yellow: 'yellow',
        lightblack: '#636363'
    }
};

//Needs images object somehow
var sectionOptions = {
	sectionOpacity : .3,
	sections : {
		topSection : {
			points: [160, 90, 263, 53, 417, 53, 520, 90, 438, 142, 340, 142, 240, 142],
			id: "TopSection",
			targetURL: 'http://prpco.com'
		},
		centerSection : {
			points: [214, 229, 244, 151, 437, 151, 464, 229, 492, 307, 338, 307, 184, 307],
			id: "CenterSection",
			targetURL: 'http://centralcoastolivegrowers.org'
		},
		leftSection : {
			points: [103, 151, 151, 94, 193, 122, 235, 150, 204, 227, 174, 303, 56, 208],
			id: "LeftSection",
			targetURL: 'http://aethys.lookingforgroup.net/drupal'
		},
		rightSection : {
			points: [446, 148, 487, 121, 529, 94, 577, 151, 625, 208, 502, 304, 474, 226],
			id: "RightSection",
			targetURL: 'http://jbdewar.com'
		},
		bottomSection : {
			points: [195, 318, 230, 318, 350, 318, 450, 318, 491, 318, 340, 643, 184, 318],
			id: "BottomSection",
			targetURL: 'http://centralcoastgrown.org'
		}
	}
};

var linesOptions = {
	drawSegmentDuration : 0.5,
	strokeColor : mainOptions.colorIDs.lightblack,
	strokeWidth : 1,
	lineCap : 'square',
	lineJoin : 'round',
	linesObjects : {
		topSectionLines : {
			line1: {
                firstPoint: {
                    x: 150,
                    y: 110
                },
                secondPoint: {
                    x: 135,
                    y: 40
                },
                thirdPoint: {
                    x: 0,
                    y: 40
                }
            },
            line2: {
                firstPoint: {
                    x: 300,
                    y: 550
                },
                secondPoint: {
                    x: 180,
                    y: 480
                },
                thirdPoint: {
                    x: 40,
                    y: 480
                }
            },
            line3: {
                firstPoint: {
                    x: 460,
                    y: 430
                },
                secondPoint: {
                    x: 540,
                    y: 390
                },
                thirdPoint: {
                    x: 680,
                    y: 390
                }
            },
            line4: {
                firstPoint: {
                    x: 470,
                    y: 80
                },
                secondPoint: {
                    x: 550,
                    y: 40
                },
                thirdPoint: {
                    x: 680,
                    y: 40
                }
            }
		},
		centerSectionLines : {
			line1: {
                firstPoint: {
                    x: 260,
                    y: 80
                },
                secondPoint: {
                    x: 160,
                    y: 40
                },
                thirdPoint: {
                    x: 15,
                    y: 40
                }
            },
            line2: {
                firstPoint: {
                    x: 280,
                    y: 400
                },
                secondPoint: {
                    x: 180,
                    y: 500
                },
                thirdPoint: {
                    x: 40,
                    y: 500
                }
            },
            line3: {
                firstPoint: {
                    x: 465,
                    y: 420
                },
                secondPoint: {
                    x: 540,
                    y: 490
                },
                thirdPoint: {
                    x: 680,
                    y: 490
                }
            }
		},
		rightSectionLines : {
			line1: {
	            firstPoint: {
	                x: 230,
	                y: 450
	            },
	            secondPoint: {
	                x: 130,
	                y: 380
	            },
	            thirdPoint: {
	                x: 0,
	                y: 380
	            }
	        },
	        line2: {
	            firstPoint: {
	                x: 460,
	                y: 90
	            },
	            secondPoint: {
	                x: 530,
	                y: 40
	            },
	            thirdPoint: {
	                x: 680,
	                y: 40
	            }
	        },
	        line3: {
	            firstPoint: {
	                x: 460,
	                y: 440
	            },
	            secondPoint: {
	                x: 550,
	                y: 400
	            },
	            thirdPoint: {
	                x: 680,
	                y: 400
	            }
	        }
		},
		leftSectionLines : {
			line1: {
	            firstPoint: {
	                x: 223,
	                y: 400
	            },
	            secondPoint: {
	                x: 130,
	                y: 500
	            },
	            thirdPoint: {
	                x: 0,
	                y: 500
	            }
	        },
	        line2: {
	            firstPoint: {
	                x: 460,
	                y: 415
	            },
	            secondPoint: {
	                x: 520,
	                y: 480
	            },
	            thirdPoint: {
	                x: 660,
	                y: 480
	            }
	        },
	        line3: {
	            firstPoint: {
	                x: 530,
	                y: 90
	            },
	            secondPoint: {
	                x: 560,
	                y: 20
	            },
	            thirdPoint: {
	                x: 680,
	                y: 20
	            }
	        }
		},
		bottomSectionLines : {
	        line1: {
                firstPoint: {
                    x: 170,
                    y: 150
                },
                secondPoint: {
                    x: 140,
                    y: 40
                },
                thirdPoint: {
                    x: 0,
                    y: 40
                }
            },
            line2: {
                firstPoint: {
                    x: 400,
                    y: 460
                },
                secondPoint: {
                    x: 520,
                    y: 510
                },
                thirdPoint: {
                    x: 660,
                    y: 510
                }
            }
        },
        defaultLines : {
        	rightLine: {
                firstPoint: {
                    x: 525,
                    y: 270
                },
                secondPoint: {
                    x: 550,
                    y: 370
                },
                thirdPoint: {
                    x: 680,
                    y: 370
                }
            },
            bottomLine: {
                firstPoint: {
                    x: 385,
                    y: 500
                },
                secondPoint: {
                    x: 510,
                    y: 550
                },
                thirdPoint: {
                    x: 670,
                    y: 550
                }
            },
            centerLine: {
                firstPoint: {
                    x: 210,
                    y: 300
                },
                secondPoint: {
                    x: 142,
                    y: 460
                },
                thirdPoint: {
                    x: 0,
                    y: 460
                }
            },
            leftLine: {
                firstPoint: {
                    x: 150,
                    y: 125
                },
                secondPoint: {
                    x: 140,
                    y: 30
                },
                thirdPoint: {
                    x: 0,
                    y: 30
                }
            },
            topLine: {
                firstPoint: {
                    x: 370,
                    y: 70
                },
                secondPoint: {
                    x: 480,
                    y: 20
                },
                thirdPoint: {
                    x: 650,
                    y: 20
                }
            }
        }
	}
};

var textsOptions = {
	titleFontFamily : 'Ubuntu',
	titleFontStyle : 'bold',
	titleFontColor : 'black',
	titleFontSize : 15,
	titleSpacer : 10,
	fontFamily : 'Ubuntu',
	fontColor : 'black',
	fontSize : 12,
	wipeDuration: 0.9,

	textObjects : {
		topSectionText : {
	        text1: {
	            x : 0,
	            y : 20,
	            width: 135,
	            text: 'My first non-WordPress site.\nMakes use of Joomla\'s MVC structure.\nIncludes custom modules',
	            title: 'Built on Joomla 2.5    '
	        },
	        text2: {
	            x : 40,
	            y : 460,
	            width: 140,
	            text: 'Active blog\nE-commerce module\nMonthly promotions\nHand-rolled company directory with QR Code to vCard module',
	            title: 'Features'

	        },
	        text3: {
	            x : 550,
	            y : 370,
	            width: 130,
	            text: 'Uses several\nstrategies for\ngathering client\ninformation, including\nmodal dialogues,\nmobile-friendly\nregistration, and\nMailChimp integration',
	            title: 'Information\ncollection',
	            align: 'right'

	        },
	        text4: {
	            x : 560,
	            y : 20,
	            width: 120,
	            text: 'Search Engine\nOptimized for\ntarget keywords.\nStrategically\norganized content\nTargetted\nresponsive design.',
	            title: 'Comprehensive\nmarketing tool',
	            align: 'right'

	        }
	    },
	    centerSectionText : {
	    	text1: {
                x : 15,
                y : 20,
                width: 145,
                text: 'Moved a previously static site to a WordPress install with all the bells and whistles',
                title : 'WordPress migration   ',
            },
            text2: {
                x : 40,
                y : 480,
                width: 140,
                text: 'Sizzling WordPress user managment and content management paired with the world\'s most popular oil',
                title: 'A tasty combination   ',

            },
            text3: {
                x : 550,
                y : 470,
                width: 130,
                text: 'Subscription based\nmembership, hand-\nrolled member profile\npage, active forum,\nand client training!',
                title: 'Features',
                align: 'right'

            }
	    },
	    rightSectionText : {
	    	text1: {
	            x : 0,
	            y : 360,
	            width: 130,
	            text: 'I worked with designers, marketing associates, and clients to produce a site the whole team can be proud of',
	            title: 'Collaborative effort    ',
	        },
		    text2: {
		            x : 540,
		            y : 20,
		            width: 140,
		            text: 'Brings a fresh look to a\nlocal institution.\nSite theme designed by\nmyself and Morgan\nDewar',
		            title: '    Handcrafted\ndesign',
		            align: 'right'
		    },
		    text3: {
		            x : 560,
		            y : 380,
		            width: 120,
		            text: 'Full responsive\ndesign with a cool\nmenu, dynamic\nhomepage content\n and an attractive,\nmobile-friendly,\ninteractive interface',
		            title: 'Features',
		            align : 'right'
	        }
	    },
	    leftSectionText : {
	    	text1: {
                x : 0,
                y : 480,
                width: 140,
                fontSize : 12,
                text: 'Built in the award winning developer\'s CMS\n\nMakes use of their integrated forum\n\nContent separated into books for intuitive navigation',
                title : 'Drupal CMS',
                titleFontSize : 15
            },
            text2: {
                x : 520,
                y : 460,
                width: 140,
                fontSize: 12,
                text: 'All assets created by\nyours truly. How would\nyour business look with\na mystical theme?',
                title: 'A chance to flex\nmy design muscles',
                titleFontSize : 15,
                align: 'right'
            },
            text3: {
                x : 550,
                y : 0,
                width: 130,
                fontSize: 12,
                text: 'This site was a great\nway to create\nsomething combining\ntwo of my passions -\ngaming and web\ndevelopment',
                title: 'I\'m a gamer!',
                titleFontSize : 15,
                align: 'right'
            }
		},
		bottomSectionText : {
	        text1: {
	            x : 0,
	            y : 20,
	            width: 130,
	            fontSize : 12,
	            text: 'Customer user map and profiles, dynamic content display, and a gorgeous blog',
	            title: 'Features',
	            titleFontSize : 15
	        },
	        text2: {
	            x : 530,
	            y : 490,
	            width: 130,
	            fontSize: 12,
	            text: 'My first production site. The design was a collaboration between myself and legend Charmaine Martinez',
	            title : '    Where it all\nbegan',
	            titleFontSize : 15,
	            align : 'right'
	        }
		},
		defaultText : {
                rightText: {
                    x : 560,
                    y : 350,
                    width: 120,
                    fontSize : 12,
                    text: 'Rebuild of local oil corporation\'s web presence, including responsive design and MailChimp newsletter integration',
                    title : 'JB Dewar',
                    titleFontSize : 15,
                    align: 'right'
                },
                bottomText: {
                    x : 520,
                    y : 530,
                    width: 150,
                    fontSize: 12,
                    text: 'Complete overhault of a\nmulti-functioned farmer\nadvocacy nonprofit. My\nfirst production site!',
                    title: 'Central Coast Grown',
                    titleFontSize : 15,
                    align: 'right'
                },
                centerText: {
                    x : 0,
                    y : 440,
                    width: 132,
                    fontSize: 12,
                    text: 'WordPress re-imagining of a previously static site. Hand-rolled members list.',
                    title: 'Central Coast Olive Growers',
                    titleFontSize : 15
                },
                leftText: {
                    x : 0,
                    y : 10,
                    width: 130,
                    fontSize: 12,
                    text: 'Feel-based fantasy roleplaying website template. Never got off the ground, but still fun to look at.',
                    title: 'World of Aethys',
                    titleFontSize : 15
                },
                topText: {
                    x : 525,
                    y : 0,
                    width: 125,
                    fontSize: 12,
                    text: 'Multi-service print\nand marketing\nagency. Blog, responsive menu,\nsome neat server-\nside doodads.',
                    title: 'PRP Companies',
                    titleFontSize : 15,
                    align: 'right'
                }
            }
	}
};

var imageSources = {
    ccogImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/ccog-full.jpg',
    aethysImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/aethys-full.jpg',
    prpImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/prp-full.jpg',
    ccgImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/ccg-full.jpg',
    jbdewarImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/jbdewar-full.jpg',
    backgroundImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/background-diamond.png'
};

var images = {};