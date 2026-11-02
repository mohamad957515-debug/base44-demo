/* global jQuery, wp */
/**
 * Project meta box: gallery picker.
 */
jQuery(function ($) {
	"use strict";

	var input = $("#sahand-gallery-ids");
	var preview = $("#sahand-gallery-preview");
	var addButton = $("#sahand-gallery-add");
	var clearButton = $("#sahand-gallery-clear");

	if (!input.length) return;

	var frame;

	function ids() {
		return (input.val() || "")
			.split(",")
			.map(function (value) {
				return value.trim();
			})
			.filter(Boolean);
	}

	function render() {
		preview.empty();
		ids().forEach(function (id) {
			var attachment = wp.media.attachment(id);
			attachment.fetch();
			attachment.on("change", function () {
				var url = attachment.get("url");
				var sizes = attachment.get("sizes");
				if (sizes && sizes.thumbnail) url = sizes.thumbnail.url;
				if (!url) return;
				preview.append(
					$('<img alt="" />').attr("src", url).css({
						width: "72px",
						height: "72px",
						objectFit: "cover",
						borderRadius: "6px",
						border: "1px solid #dcdcde"
					})
				);
			});
		});
	}

	addButton.on("click", function (event) {
		event.preventDefault();
		if (!frame) {
			frame = wp.media({
				title: "انتخاب تصاویر گالری",
				button: { text: "افزودن به گالری" },
				library: { type: "image" },
				multiple: "add"
			});
			frame.on("select", function () {
				var selection = frame.state().get("selection");
				var next = ids();
				selection.each(function (attachment) {
					var id = String(attachment.id);
					if (next.indexOf(id) === -1) next.push(id);
				});
				input.val(next.join(","));
				render();
			});
		}
		frame.open();
	});

	clearButton.on("click", function (event) {
		event.preventDefault();
		input.val("");
		preview.empty();
	});

	render();
});
