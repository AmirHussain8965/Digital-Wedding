/**
 * Eternally — UI translations (EN / FR) with localStorage persistence.
 * Content for DE/ES selections falls back to English; UI code still updates.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "eternally_ui_lang";
    var DEFAULT_LANG = "EN";

    var TRANSLATIONS = {
        EN: {
            meta_title: "Eternally - Digital Wedding Invitations",
            lang_name_en: "English",
            lang_name_fr: "Français",
            lang_name_de: "Deutsch",
            lang_name_es: "Español",
            nav_sign_in: "Sign In",
            nav_get_started: "Get Started",
            hero_heading:
                "Digital Wedding\n<em>Invitations &amp; Save the<br>Dates You'll Remember</em>",
            hero_desc:
                "Create stunning, personalized digital wedding invitations with effortless RSVP management. Share your love story with elegance and sophistication.",
            hero_btn_primary: "Create Your Invitation",
            hero_btn_secondary: "View Demo",
            hero_badge_1: "Free to Start",
            hero_badge_2: "No Credit Card Required",
            hero_badge_3: "Unlimited Guests",
            img_hero_phone: "Wedding invitation preview on phone",
            features_badge: "Features",
            features_heading: "Everything You Need for Your<br>\n                <em>Special Day</em>",
            features_subtext:
                "Create beautiful invitations with all the features you need to make your wedding day unforgettable",
            feat_countdown_title: "Countdown Timer",
            feat_countdown_desc: "Build excitement with a live countdown to your wedding day",
            feat_guest_title: "Guest Management",
            feat_guest_desc: "Track RSVPs and manage your guest list effortlessly",
            feat_luxury_title: "Luxury Themes",
            feat_luxury_desc: "Stunning color themes — Ivory, Burgundy, Sage &amp; more",
            feat_maps_title: "Interactive Maps",
            feat_maps_desc: "Venue maps &amp; directions",
            feat_links_title: "Private Links",
            feat_links_desc: "Unique link per guest",
            feat_schedule_title: "Event Schedule",
            feat_schedule_desc: "Full wedding timeline",
            feat_song_title: "Your Special Song",
            feat_song_desc: "Feature your song",
            feat_gift_title: "Gift Registry",
            feat_gift_desc: "Elegant integration",
            feat_mobile_title: "Mobile Optimized",
            feat_mobile_desc: "Perfect on every device",
            img_feat_1: "Countdown Timer",
            img_feat_2: "Guest Management",
            img_feat_3: "Luxury Themes",
            img_feat_4: "Interactive Maps",
            img_feat_5: "Private Links",
            img_feat_6: "Event Schedule",
            img_feat_7: "Your Special Song",
            img_feat_8: "Gift Registry",
            img_feat_9: "Mobile Optimized",
            how_heading: "Simple. Elegant.<br>\n                    <em>Effortless</em>",
            how_subtext: "Create your perfect wedding invitation in just three steps",
            how_step1_title: "Create Your Invitation",
            how_step1_desc:
                "Choose your theme, add your names, date, venue, and personalize every detail with our intuitive editor",
            how_step2_title: "Invite Your Guests",
            how_step2_desc:
                "Add guests to your list and share unique private links via email, WhatsApp, or any messaging app",
            how_step3_title: "Track RSVPs",
            how_step3_desc:
                "Watch responses come in real-time and manage your guest list effortlessly from your dashboard",
            templates_badge: "Premium Collection",
            templates_heading: "Stunning Pre-Designed<br>\n                <em>Invitation Templates</em>",
            templates_subtext:
                "Choose from our exclusive collection of professionally designed templates.<br>\n                Each template is a complete, dynamic invitation experience your guests will love.",
            common_popular: "Popular",
            common_view_demo: "View Demo",
            tmpl_royal_gold_name: "Royal Gold",
            tmpl_royal_gold_style: "Classic Luxury",
            tmpl_red_curtain_name: "Red Curtain",
            tmpl_red_curtain_style: "Dramatic Romance",
            tmpl_floral_name: "Floral Romance",
            tmpl_floral_style: "Romantic Garden",
            tmpl_modern_name: "Modern Minimal",
            tmpl_modern_style: "Contemporary",
            img_tmpl_royal: "Royal Gold",
            img_tmpl_red: "Red Curtain",
            img_tmpl_floral: "Floral Romance",
            img_tmpl_modern: "Modern Minimal",
            templates_cta: "Get Started with Premium",
            templates_note:
                "All templates include full customization • Dynamic animations • RSVP management",
            why_badge: "Why Go Digital?",
            why_heading: "Paper Invitations vs<br>\n                <em>Digital Invitations</em>",
            why_subtext:
                "Discover why thousands of modern couples are choosing digital invitations for their special day",
            compare_paper_title: "Paper",
            compare_digital_title: "Digital ✨",
            compare_cost: "Cost",
            compare_delivery: "Delivery",
            compare_updates: "Updates",
            compare_rsvp: "RSVP Tracking",
            compare_eco: "Eco Impact",
            paper_cost_val: "€200–€500+",
            paper_delivery_val: "2–4 weeks",
            paper_updates_val: "Impossible",
            paper_rsvp_val: "Manual",
            paper_eco_val: "High waste",
            digital_cost_val: "Free – €29",
            digital_delivery_val: "Instant",
            digital_updates_val: "Real-time",
            digital_rsvp_val: "Automatic",
            digital_eco_val: "Zero waste",
            benefit_eco_tag: "0 trees cut",
            benefit_eco_title: "Eco-Friendly",
            benefit_eco_desc:
                "Zero paper waste. Choose a sustainable option for your wedding without compromising on elegance.",
            benefit_instant_tag: "Delivered in seconds",
            benefit_instant_title: "Instant Delivery",
            benefit_instant_desc:
                "Share your invitation in seconds via WhatsApp, email, or any messaging app. No postal delays.",
            benefit_cost_tag: "Save up to 80%",
            benefit_cost_title: "Cost-Effective",
            benefit_cost_desc:
                "Save hundreds on printing, postage, and design fees. Invest in what truly matters for your day.",
            benefit_rsvp_tag: "Live updates",
            benefit_rsvp_title: "Real-Time RSVP Tracking",
            benefit_rsvp_desc:
                "Know instantly who's coming. Track responses in real-time without calling or texting each guest.",
            benefit_reach_tag: "No borders",
            benefit_reach_title: "Reach Everyone",
            benefit_reach_desc:
                "Invite guests worldwide with no geographic limits. Perfect for international couples and destination weddings.",
            benefit_access_tag: "24/7 access",
            benefit_access_title: "Always Accessible",
            benefit_access_desc:
                "Your guests can access the invitation anytime, anywhere from their phone. No lost cards or forgotten dates.",
            benefit_update_tag: "Update anytime",
            benefit_update_title: "Easy Updates",
            benefit_update_desc:
                "Changed the venue or time? Update your invitation instantly. All guests see the latest version automatically.",
            benefit_secure_tag: "Unique links",
            benefit_secure_title: "Private &amp; Secure",
            benefit_secure_desc:
                "Each guest gets a unique private link. Your invitation is only visible to the people you choose to share it with.",
            pricing_badge: "Choose Your Plan",
            pricing_heading: "Standard or Premium<br>\n                <em>The Choice is Yours</em>",
            pricing_subtext:
                "Whether you want to create your own design or use our premium templates,<br>\n                we have the perfect option for your special day.",
            plan_standard_name: "Standard",
            plan_standard_sub: "Create Your Own",
            plan_premium_name: "Premium",
            plan_premium_sub: "Pre-Designed Templates",
            plan_bespoke_name: "Bespoke",
            plan_bespoke_sub: "Custom Design",
            price_free: "Free",
            price_free_note: "Forever free",
            price_premium: "€29",
            price_premium_note: "One-time payment",
            price_bespoke: "€99",
            price_bespoke_note: "Custom designed for you",
            plan_standard_desc:
                "Import your own photos and customize your invitation with our easy-to-use editor. Perfect for couples who want full creative control.",
            plan_premium_desc:
                "Choose from our exclusive collection of professionally designed dynamic invitation templates. Simply customize the details and share.",
            plan_bespoke_desc:
                "Work with our design team to create a completely unique, one-of-a-kind invitation that perfectly reflects your love story.",
            pricing_btn_free: "Get Started Free",
            pricing_btn_premium: "Choose Premium",
            pricing_btn_contact: "Contact Us",
            std_feat_1: "Upload your own photos from gallery",
            std_feat_2: "Customize colors, fonts &amp; layout",
            std_feat_3: "Countdown timer &amp; event details",
            std_feat_4: "RSVP management &amp; guest tracking",
            std_feat_5: "Private shareable links",
            std_feat_6: "Interactive map integration",
            std_feat_7: "Mobile-optimized design",
            std_feat_8: "Unlimited guests",
            prem_feat_1: "All Standard features included",
            prem_feat_2: "Access to premium template collection",
            prem_feat_3: "Dynamic animated invitations",
            prem_feat_4: "Professional designer-crafted layouts",
            prem_feat_5: "Exclusive luxury themes &amp; effects",
            prem_feat_6: "Custom dress code section",
            prem_feat_7: "Gift registry integration",
            prem_feat_8: "Transport &amp; accommodation details",
            prem_feat_9: "Priority support",
            prem_feat_10: "Multi-language support (EN/FR/DE/ES)",
            bes_feat_1: "All Premium features included",
            bes_feat_2: "Dedicated designer consultation",
            bes_feat_3: "Fully custom design from scratch",
            bes_feat_4: "Unlimited design revisions",
            bes_feat_5: "Bespoke animations &amp; effects",
            bes_feat_6: "Custom illustrations on request",
            bes_feat_7: "VIP support &amp; onboarding",
            bes_feat_8: "Brand-matched wedding suite",
            testimonials_heading: "Loved by Couples<br>\n                    <em>Around the World</em>",
            testimonials_subtext:
                "Join thousands of happy couples who chose Eternally for their special day",
            testi_1_quote:
                '"Eternally transformed our wedding experience. The digital invitation was so elegant that our guests couldn\'t stop complimenting it. The RSVP tracking saved us countless hours!"',
            testi_1_badge: "Premium – Royal Gold",
            testi_1_loc: "Paris, France",
            testi_2_quote:
                '"We chose the Premium template and it was absolutely stunning. Our guests felt like they received a luxury experience. The countdown timer built so much excitement!"',
            testi_2_badge: "Premium – Floral Romance",
            testi_2_loc: "Barcelona, Spain",
            testi_3_quote:
                '"The standard option was perfect for us. We uploaded our own photos and the result was breathtaking. So much better than paper invitations!"',
            testi_3_badge: "Standard",
            testi_3_loc: "London, UK",
            testi_4_quote:
                '"Multilingual support was a game-changer for our international wedding. Guests from 4 countries could all read the invitation in their language!"',
            testi_4_badge: "Premium – Burgundy Velvet",
            testi_4_loc: "Munich, Germany",
            testi_5_quote:
                '"We were hesitant about digital invitations, but Eternally changed our minds. The premium Red Curtain template was theatrical and unforgettable!"',
            testi_5_badge: "Premium – Red Curtain",
            testi_5_loc: "Rome, Italy",
            testi_6_quote:
                '"The eco-friendly aspect sealed the deal for us. Zero paper waste, beautiful design, and our guests loved how easy it was to RSVP with one click."',
            testi_6_badge: "Standard",
            testi_6_loc: "Zurich, Switzerland",
            stat_couples: "Happy Couples",
            stat_invites: "Invitations Sent",
            stat_rating: "Average Rating",
            stat_countries: "Countries",
            preview_label: "PREVIEW",
            preview_heading: "See What Your Guests<br>\n                            <em>Will Experience</em>",
            preview_desc:
                "Every invitation is crafted with attention to detail — from the elegant typography to the seamless RSVP experience. Your guests will love the beautiful design and easy-to-use interface.",
            preview_li_1: "Countdown timer building anticipation",
            preview_li_2: "Beautiful hero image and couple names",
            preview_li_3: "Event details with date, time, and location",
            preview_li_4: "Interactive map integration",
            preview_li_5: "Simple one-click RSVP process",
            preview_li_6: "Personalized greeting for each guest",
            preview_demo_btn: "View Live Demo",
            cta_heading: "Start Creating Your<br>\n                    <em>Dream Invitation Today</em>",
            cta_subtext:
                "Join thousands of couples who have shared their special day with<br>\n                    Eternally. No credit card required to get started.",
            cta_btn_primary: "Create Free Invitation",
            cta_btn_secondary: "View Demo",
            cta_note: "Free forever • Unlimited invitations • Premium features included",
            footer_tagline:
                "Create beautiful digital wedding invitations that your guests will cherish. Elegant, effortless, and unforgettable.",
            footer_product: "Product",
            footer_link_create: "Create Invitation",
            footer_link_demo: "View Demo",
            footer_link_premium: "Premium Templates",
            footer_link_pricing: "Pricing",
            footer_link_signin: "Sign In",
            footer_company: "Company",
            footer_about: "About Us",
            footer_contact: "Contact",
            footer_privacy: "Privacy Policy",
            footer_terms: "Terms of Service",
            footer_copyright: "© 2026 Eternally. All rights reserved.",
            footer_love: "Made with love for couples everywhere",
            aria_back_to_top: "Back to top",
            toast_done: "Done!",
            toast_demo_opening: "Demo opening soon!",
            toast_lang_changed: "Language changed to {{label}}"
        },
        FR: {
            meta_title: "Eternally - Invitations de mariage numériques",
            lang_name_en: "Anglais",
            lang_name_fr: "Français",
            lang_name_de: "Allemand",
            lang_name_es: "Espagnol",
            nav_sign_in: "Connexion",
            nav_get_started: "Commencer",
            hero_heading:
                "Invitations de mariage numériques\n<em>Save-the-date &amp; invitations<br>inoubliables</em>",
            hero_desc:
                "Créez de superbes invitations de mariage numériques personnalisées avec une gestion des RSVP sans effort. Partagez votre histoire d’amour avec élégance et raffinement.",
            hero_btn_primary: "Créer votre invitation",
            hero_btn_secondary: "Voir la démo",
            hero_badge_1: "Gratuit pour commencer",
            hero_badge_2: "Sans carte bancaire",
            hero_badge_3: "Invités illimités",
            img_hero_phone: "Aperçu d’invitation de mariage sur téléphone",
            features_badge: "Fonctionnalités",
            features_heading: "Tout ce dont vous avez besoin pour<br>\n                <em>votre grand jour</em>",
            features_subtext:
                "Créez de belles invitations avec toutes les fonctionnalités pour rendre votre mariage inoubliable",
            feat_countdown_title: "Compte à rebours",
            feat_countdown_desc: "Créez l’attente avec un compte à rebours en direct jusqu’au jour J",
            feat_guest_title: "Gestion des invités",
            feat_guest_desc: "Suivez les RSVP et gérez votre liste d’invités sans effort",
            feat_luxury_title: "Thèmes luxe",
            feat_luxury_desc: "Superbes palettes — Ivoire, Bordeaux, Sauge et plus encore",
            feat_maps_title: "Cartes interactives",
            feat_maps_desc: "Plans du lieu et itinéraires",
            feat_links_title: "Liens privés",
            feat_links_desc: "Lien unique par invité",
            feat_schedule_title: "Programme",
            feat_schedule_desc: "Planning complet du mariage",
            feat_song_title: "Votre chanson",
            feat_song_desc: "Mettez en avant votre musique",
            feat_gift_title: "Liste de cadeaux",
            feat_gift_desc: "Intégration élégante",
            feat_mobile_title: "Optimisé mobile",
            feat_mobile_desc: "Parfait sur tous les appareils",
            img_feat_1: "Compte à rebours",
            img_feat_2: "Gestion des invités",
            img_feat_3: "Thèmes luxe",
            img_feat_4: "Cartes interactives",
            img_feat_5: "Liens privés",
            img_feat_6: "Programme",
            img_feat_7: "Votre chanson",
            img_feat_8: "Liste de cadeaux",
            img_feat_9: "Optimisé mobile",
            how_heading: "Simple. Élégant.<br>\n                    <em>Sans effort</em>",
            how_subtext: "Créez votre invitation de mariage idéale en trois étapes",
            how_step1_title: "Créez votre invitation",
            how_step1_desc:
                "Choisissez votre thème, ajoutez vos noms, la date, le lieu et personnalisez chaque détail avec notre éditeur intuitif",
            how_step2_title: "Invitez vos proches",
            how_step2_desc:
                "Ajoutez vos invités et partagez des liens privés uniques par e-mail, WhatsApp ou tout autre messager",
            how_step3_title: "Suivez les RSVP",
            how_step3_desc:
                "Voyez les réponses en temps réel et gérez votre liste depuis votre tableau de bord",
            templates_badge: "Collection premium",
            templates_heading: "Modèles d’invitation<br>\n                <em>conçus pour vous</em>",
            templates_subtext:
                "Choisissez parmi notre collection exclusive de modèles professionnels.<br>\n                Chaque modèle offre une expérience d’invitation dynamique que vos invités adoreront.",
            common_popular: "Populaire",
            common_view_demo: "Voir la démo",
            tmpl_royal_gold_name: "Royal Gold",
            tmpl_royal_gold_style: "Luxe classique",
            tmpl_red_curtain_name: "Rideau rouge",
            tmpl_red_curtain_style: "Romantisme théâtral",
            tmpl_floral_name: "Romance florale",
            tmpl_floral_style: "Jardin romantique",
            tmpl_modern_name: "Moderne minimaliste",
            tmpl_modern_style: "Contemporain",
            img_tmpl_royal: "Royal Gold",
            img_tmpl_red: "Rideau rouge",
            img_tmpl_floral: "Romance florale",
            img_tmpl_modern: "Moderne minimaliste",
            templates_cta: "Commencer avec le Premium",
            templates_note:
                "Tous les modèles incluent une personnalisation complète • Animations dynamiques • Gestion des RSVP",
            why_badge: "Pourquoi le numérique ?",
            why_heading: "Invitations papier<br>\n                <em>vs invitations numériques</em>",
            why_subtext:
                "Découvrez pourquoi des milliers de couples modernes choisissent le numérique pour leur grand jour",
            compare_paper_title: "Papier",
            compare_digital_title: "Numérique ✨",
            compare_cost: "Coût",
            compare_delivery: "Livraison",
            compare_updates: "Mises à jour",
            compare_rsvp: "Suivi des RSVP",
            compare_eco: "Impact écologique",
            paper_cost_val: "200–500 €+",
            paper_delivery_val: "2 à 4 semaines",
            paper_updates_val: "Impossible",
            paper_rsvp_val: "Manuel",
            paper_eco_val: "Beaucoup de déchets",
            digital_cost_val: "Gratuit – 29 €",
            digital_delivery_val: "Instantané",
            digital_updates_val: "En temps réel",
            digital_rsvp_val: "Automatique",
            digital_eco_val: "Zéro déchet",
            benefit_eco_tag: "0 arbre coupé",
            benefit_eco_title: "Écologique",
            benefit_eco_desc:
                "Zéro papier. Choisissez une option durable sans sacrifier l’élégance.",
            benefit_instant_tag: "Envoyé en quelques secondes",
            benefit_instant_title: "Envoi instantané",
            benefit_instant_desc:
                "Partagez votre invitation en quelques secondes par WhatsApp, e-mail ou messagerie. Plus d’attente postale.",
            benefit_cost_tag: "Jusqu’à 80 % d’économies",
            benefit_cost_title: "Économique",
            benefit_cost_desc:
                "Économisez sur l’impression, l’affranchissement et le design. Investissez dans l’essentiel.",
            benefit_rsvp_tag: "Mises à jour en direct",
            benefit_rsvp_title: "RSVP en temps réel",
            benefit_rsvp_desc:
                "Sachez tout de suite qui vient. Suivez les réponses sans relancer chaque invité.",
            benefit_reach_tag: "Sans frontières",
            benefit_reach_title: "Touchez tout le monde",
            benefit_reach_desc:
                "Invitez partout dans le monde. Idéal pour les couples internationaux et les mariages à destination.",
            benefit_access_tag: "Accès 24h/24",
            benefit_access_title: "Toujours accessible",
            benefit_access_desc:
                "Vos invités consultent l’invitation où et quand ils veulent sur leur téléphone. Plus de carton perdu.",
            benefit_update_tag: "Modifiez quand vous voulez",
            benefit_update_title: "Mises à jour faciles",
            benefit_update_desc:
                "Lieu ou horaire modifié ? Mettez à jour l’invitation instantanément. Tout le monde voit la dernière version.",
            benefit_secure_tag: "Liens uniques",
            benefit_secure_title: "Privé et sécurisé",
            benefit_secure_desc:
                "Chaque invité reçoit un lien privé. Votre invitation n’est visible que par ceux que vous choisissez.",
            pricing_badge: "Choisissez votre offre",
            pricing_heading: "Standard ou Premium<br>\n                <em>À vous de choisir</em>",
            pricing_subtext:
                "Que vous créiez votre propre design ou utilisiez nos modèles premium,<br>\n                nous avons l’option idéale pour votre grand jour.",
            plan_standard_name: "Standard",
            plan_standard_sub: "Créez le vôtre",
            plan_premium_name: "Premium",
            plan_premium_sub: "Modèles prédéfinis",
            plan_bespoke_name: "Sur mesure",
            plan_bespoke_sub: "Design personnalisé",
            price_free: "Gratuit",
            price_free_note: "Gratuit pour toujours",
            price_premium: "29 €",
            price_premium_note: "Paiement unique",
            price_bespoke: "99 €",
            price_bespoke_note: "Conçu pour vous",
            plan_standard_desc:
                "Importez vos photos et personnalisez votre invitation avec notre éditeur simple. Parfait pour garder la main sur le design.",
            plan_premium_desc:
                "Choisissez parmi nos modèles dynamiques conçus par des pros. Personnalisez les détails et partagez.",
            plan_bespoke_desc:
                "Travaillez avec notre équipe pour une invitation unique qui raconte votre histoire.",
            pricing_btn_free: "Commencer gratuitement",
            pricing_btn_premium: "Choisir Premium",
            pricing_btn_contact: "Nous contacter",
            std_feat_1: "Import de photos depuis votre galerie",
            std_feat_2: "Couleurs, polices et mise en page",
            std_feat_3: "Compte à rebours et infos sur l’événement",
            std_feat_4: "Gestion des RSVP et suivi des invités",
            std_feat_5: "Liens privés à partager",
            std_feat_6: "Carte interactive",
            std_feat_7: "Design optimisé mobile",
            std_feat_8: "Invités illimités",
            prem_feat_1: "Toutes les fonctionnalités Standard",
            prem_feat_2: "Accès à la collection premium",
            prem_feat_3: "Invitations animées dynamiques",
            prem_feat_4: "Mises en page de designer",
            prem_feat_5: "Thèmes luxe et effets exclusifs",
            prem_feat_6: "Rubrique code vestimentaire",
            prem_feat_7: "Intégration liste de cadeaux",
            prem_feat_8: "Infos transport et hébergement",
            prem_feat_9: "Support prioritaire",
            prem_feat_10: "Multilingue (EN/FR/DE/ES)",
            bes_feat_1: "Toutes les fonctionnalités Premium",
            bes_feat_2: "Consultation dédiée avec un designer",
            bes_feat_3: "Design entièrement sur mesure",
            bes_feat_4: "Révisions illimitées",
            bes_feat_5: "Animations et effets sur mesure",
            bes_feat_6: "Illustrations sur demande",
            bes_feat_7: "Support VIP et onboarding",
            bes_feat_8: "Suite mariage alignée sur votre image",
            testimonials_heading: "Plébiscité par des couples<br>\n                    <em>du monde entier</em>",
            testimonials_subtext:
                "Rejoignez des milliers de couples heureux qui ont choisi Eternally pour leur grand jour",
            testi_1_quote:
                "« Eternally a transformé notre mariage. L’invitation numérique était si élégante que nos invités n’arrêtaient pas de la compliment. Le suivi des RSVP nous a fait gagner un temps fou ! »",
            testi_1_badge: "Premium – Royal Gold",
            testi_1_loc: "Paris, France",
            testi_2_quote:
                "« Nous avons choisi un modèle Premium : magnifique. Nos invités avaient l’impression d’une expérience luxe. Le compte à rebours a créé une vraie impatience ! »",
            testi_2_badge: "Premium – Romance florale",
            testi_2_loc: "Barcelone, Espagne",
            testi_3_quote:
                "« L’offre Standard nous convenait parfaitement. Nos photos, un rendu sublime. Bien mieux que le papier ! »",
            testi_3_badge: "Standard",
            testi_3_loc: "Londres, Royaume-Uni",
            testi_4_quote:
                "« Le multilingue a tout changé pour notre mariage international. Des invités de 4 pays ont pu lire l’invitation dans leur langue ! »",
            testi_4_badge: "Premium – Burgundy Velvet",
            testi_4_loc: "Munich, Allemagne",
            testi_5_quote:
                "« Nous hésitions avec le numérique, mais Eternally nous a convaincus. Le modèle Rideau rouge était théâtral et inoubliable ! »",
            testi_5_badge: "Premium – Rideau rouge",
            testi_5_loc: "Rome, Italie",
            testi_6_quote:
                "« L’aspect écolo nous a séduits. Zéro papier, un beau design, et un RSVP en un clic pour nos invités. »",
            testi_6_badge: "Standard",
            testi_6_loc: "Zurich, Suisse",
            stat_couples: "Couples heureux",
            stat_invites: "Invitations envoyées",
            stat_rating: "Note moyenne",
            stat_countries: "Pays",
            preview_label: "APERÇU",
            preview_heading: "Découvrez ce que vos invités<br>\n                            <em>vont vivre</em>",
            preview_desc:
                "Chaque invitation est pensée dans les moindres détails — typographie, RSVP fluide. Vos invités apprécieront le design et la simplicité.",
            preview_li_1: "Compte à rebours pour créer l’attente",
            preview_li_2: "Belle image et noms des mariés",
            preview_li_3: "Infos : date, heure et lieu",
            preview_li_4: "Carte interactive",
            preview_li_5: "RSVP en un clic",
            preview_li_6: "Message personnalisé pour chaque invité",
            preview_demo_btn: "Voir la démo en direct",
            cta_heading: "Créez dès aujourd’hui<br>\n                    <em>l’invitation de vos rêves</em>",
            cta_subtext:
                "Rejoignez des milliers de couples qui ont partagé leur jour J avec<br>\n                    Eternally. Aucune carte bancaire pour commencer.",
            cta_btn_primary: "Créer une invitation gratuite",
            cta_btn_secondary: "Voir la démo",
            cta_note: "Gratuit pour toujours • Invitations illimitées • Fonctionnalités premium incluses",
            footer_tagline:
                "Créez de belles invitations numériques que vos invités chériront. Élégantes, simples et inoubliables.",
            footer_product: "Produit",
            footer_link_create: "Créer une invitation",
            footer_link_demo: "Voir la démo",
            footer_link_premium: "Modèles premium",
            footer_link_pricing: "Tarifs",
            footer_link_signin: "Connexion",
            footer_company: "Entreprise",
            footer_about: "À propos",
            footer_contact: "Contact",
            footer_privacy: "Politique de confidentialité",
            footer_terms: "Conditions d’utilisation",
            footer_copyright: "© 2026 Eternally. Tous droits réservés.",
            footer_love: "Fait avec amour pour les couples du monde entier",
            aria_back_to_top: "Retour en haut",
            toast_done: "C’est fait !",
            toast_demo_opening: "La démo arrive bientôt !",
            toast_lang_changed: "Langue : {{label}}"
        }
    };

    function getContentLang(uiLang) {
        return uiLang === "FR" ? "FR" : "EN";
    }

    function lookup(lang, key) {
        var pack = TRANSLATIONS[lang];
        if (!pack || !Object.prototype.hasOwnProperty.call(pack, key)) {
            return TRANSLATIONS[DEFAULT_LANG][key] || "";
        }
        return pack[key];
    }

    function interpolate(str, vars) {
        if (!str || !vars) return str;
        return str.replace(/\{\{(\w+)\}\}/g, function (_, name) {
            return vars[name] != null ? String(vars[name]) : "";
        });
    }

    var currentUiLang = DEFAULT_LANG;
    var currentContentLang = DEFAULT_LANG;

    function applyTextContent(lang) {
        var nodes = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (el.tagName === "TITLE") continue;
            var key = el.getAttribute("data-i18n");
            if (!key) continue;
            var val = lookup(lang, key);
            if (val !== undefined && val !== "") el.textContent = val;
        }
    }

    function applyHtmlContent(lang) {
        var nodes = document.querySelectorAll("[data-i18n-html]");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var key = el.getAttribute("data-i18n-html");
            if (!key || key === "hero_heading") continue;
            var val = lookup(lang, key);
            if (val !== undefined && val !== "") {
                el.innerHTML = val.replace(/\r\n/g, "\n").trim();
            }
        }
    }

    /** Preserves line breaks in hero heading between the main title and the &lt;em&gt; block */
    function applyHeroHeading(lang) {
        var el = document.querySelector("[data-i18n-html=\"hero_heading\"]");
        if (!el) return;
        var raw = lookup(lang, "hero_heading");
        if (!raw) return;
        var html = raw
            .split("\n")
            .map(function (line) {
                return line.trim();
            })
            .join("<br>");
        el.innerHTML = html;
    }

    function applyMetaAndLangAttr(lang) {
        document.documentElement.lang = lang === "FR" ? "fr" : "en";
        var titleEl = document.querySelector("title[data-i18n]");
        if (titleEl) {
            var k = titleEl.getAttribute("data-i18n");
            var t = lookup(lang, k);
            if (t) {
                document.title = t;
                titleEl.textContent = t;
            }
        }
    }

    function applyAltAttributes(lang) {
        var nodes = document.querySelectorAll("[data-i18n-alt]");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var key = el.getAttribute("data-i18n-alt");
            if (!key) continue;
            var val = lookup(lang, key);
            if (val) el.setAttribute("alt", val);
        }
    }

    function applyAria(lang) {
        var btn = document.getElementById("backToTop");
        if (btn && btn.hasAttribute("data-i18n-aria-label")) {
            var k = btn.getAttribute("data-i18n-aria-label");
            var v = lookup(lang, k);
            if (v) btn.setAttribute("aria-label", v);
        }
    }

    function updateLangButtonCode(uiLang) {
        var btn = document.getElementById("lang_toggle_btn");
        if (!btn) return;
        var span = btn.querySelector("span:not(.lang_arrow)");
        if (span) span.textContent = uiLang;
    }

    function setActiveLangOption(uiLang) {
        document.querySelectorAll(".lang_option[data-lang]").forEach(function (opt) {
            opt.classList.toggle("active", opt.getAttribute("data-lang") === uiLang);
        });
    }

    function applyLanguage(uiLang) {
        currentUiLang = uiLang || DEFAULT_LANG;
        currentContentLang = getContentLang(currentUiLang);

        try {
            localStorage.setItem(STORAGE_KEY, currentUiLang);
        } catch (e) {}

        applyMetaAndLangAttr(currentContentLang);
        applyTextContent(currentContentLang);
        applyHtmlContent(currentContentLang);
        applyHeroHeading(currentContentLang);
        applyAltAttributes(currentContentLang);
        applyAria(currentContentLang);
        updateLangButtonCode(currentUiLang);
        setActiveLangOption(currentUiLang);
    }

    function loadSavedUiLang() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "EN" || saved === "FR" || saved === "DE" || saved === "ES") {
                return saved;
            }
        } catch (e) {}
        return DEFAULT_LANG;
    }

    function bindLangOptions() {
        var langToggleBtn = document.getElementById("lang_toggle_btn");
        var langDropdown = document.getElementById("lang_dropdown");
        var langArrow = langToggleBtn ? langToggleBtn.querySelector(".lang_arrow") : null;
        var options = document.querySelectorAll(".lang_option[data-lang]");

        options.forEach(function (option) {
            option.addEventListener("click", function (e) {
                e.preventDefault();
                var selected = option.getAttribute("data-lang");
                applyLanguage(selected);

                var labelSpan = option.querySelector("[data-i18n]");
                var labelText = labelSpan ? labelSpan.textContent.trim() : selected;

                if (langDropdown) {
                    langDropdown.classList.remove("open");
                }
                if (langArrow) {
                    langArrow.classList.remove("open");
                }

                if (typeof window.showToast === "function") {
                    var tpl = lookup(getContentLang(selected), "toast_lang_changed");
                    var msg = interpolate(tpl, { label: labelText });
                    window.showToast(msg);
                }
            });
        });
    }

    function init() {
        var saved = loadSavedUiLang();
        applyLanguage(saved);
        bindLangOptions();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.EternallyI18n = {
        getUiLang: function () {
            return currentUiLang;
        },
        getContentLang: function () {
            return currentContentLang;
        },
        t: function (key) {
            return lookup(currentContentLang, key);
        },
        toastDemoOpening: function () {
            return lookup(currentContentLang, "toast_demo_opening");
        }
    };
})();
