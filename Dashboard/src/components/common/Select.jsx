import { useEffect, useMemo, useState } from "react";
import { uuid } from "../../utils/uuid";
import PropTypes from "prop-types";
import { classNames } from "../../utils/classNames";

export const Select = ({ options, value, onChange }) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const [id] = useState(uuid());

    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                !e.target.closest(`#Toggle-${id}`) &&
                !e.target.closest(`#Select-${id}`)
            )
                setOpen(false);
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [id]);

    const opt = useMemo(() => {
        // Quản lý tìm kiếm và options
        const OPTIONS = options.filter(
            (o) =>
                ((o.includes(search)))
        );

        return OPTIONS.length > 0
            ? OPTIONS.map((o, i) => (
                <div
                    key={i}
                    className="px-3 py-1 cursor-pointer text-neutral-600 hover:bg-neutral-300"
                    onClick={() => {
                        onChange(o);
                        setOpen(false);
                    }}
                >
                    {o}
                </div>
            ))
            : [
                <div
                    key={"not-found"}
                    className="px-3 py-1 cursor-pointer text-neutral-600 hover:bg-neutral-300"
                    onClick={() => {
                        onChange("");
                        setOpen(false);
                    }}
                >
                    Không tìm thấy
                </div>,
            ];
    }, [options, search, onChange]);

    useMemo(() => setSearch(value), [value]);

    return (
        <div
            id={`Select-${id}`}
            className="relative flex flex-col items-center justify-center w-full"
        >
            <div className="flex items-center justify-between w-full gap-1 overflow-hidden border divide-x rounded-md divide-neutral-200 border-neutral-400">
                <input
                    className="block w-full p-1 text-sm text-gray-900 outline-none bg-gray-50 "
                    placeholder="Tìm kiếm..."
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setOpen(true)}
                />
                <span
                    className="relative p-4 cursor-pointer"
                    onClick={() => setOpen((p) => !p)}
                    id={`Toggle-${id}`}
                >
                    <span
                        className={classNames(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[6px] border-l-transparent border-r-transparent border-b-0 border-t-neutral-900 transition-[transform]",
                            open ? "rotate-180" : "rotate-0"
                        )}
                    ></span>
                </span>
            </div>
            <div
                id="options"
                className={classNames(
                    "absolute top-9 z-20 border-neutral-400 w-full rounded-md overflow-auto transition-all bg-white",
                    open ? "max-h-40 border" : "max-h-0 border-0"
                )}
            >
                {opt}
            </div>
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
    options: [],
    value: "",
    onChange: () => { },
};