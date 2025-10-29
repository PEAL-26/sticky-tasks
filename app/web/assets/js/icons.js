const {
    createIcons,
    ArrowRight,
    Settings,
    Search,
    Trash2,
    Plus,
    Ellipsis,
    Loader,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    X
} = lucide


const ICONS = {
    "arrow-right": { ArrowRight },
    "arrow-left": { ArrowLeft },
    "settings": { Settings },
    "search": { Search },
    "trash-2": { Trash2 },
    "plus": { Plus },
    "ellipsis": { Ellipsis },
    "loader": { Loader },
    "chevron-down": { ChevronDown },
    "chevron-up": { ChevronUp },
    "x": { X }
}

function getIcons() {
    let obj = {}
    Object.values(ICONS).forEach((icon) => {
        const i = Object.entries(icon).forEach(([key, value]) => {
            obj[key] = value
        })
    })

    return obj
}

function getIconByName(name) {
    let obj = {}
    const icon = ICONS[name]
    if (!icon) return null
    const [value] = Object.values(icon)

    return value
}

createIcons({
    icons: getIcons()
});
