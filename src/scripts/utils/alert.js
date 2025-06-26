import Swal from "sweetalert2";

export function showSuccess(message="Berhasil") {
    return Swal.fire({
        icon: "success",
        title: "Sukses",
        text: message,
        customClass: {
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
        },
        buttonsStyling: false,
    })
}

export function showError(message="Terjadi Kesalahan") {
    return Swal.fire({
        icon: "error",
        title: "Opps!",
        text: message,
        confirmButtonColor: "#ef4444",
    });
}

export function showConfirm({ title, text }) {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        customClass: {
            actions: "flex justify-center space-x-2 mt-4",
            confirmButton: "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
            cancelButton: "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400",
        },
        buttonsStyling: false,
    })
}

export function showToast(message) {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
}
